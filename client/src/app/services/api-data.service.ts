import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../classes/user.class';
import { Catprogramas } from '../classes/catprogramas.class';
import { ServerMessage } from '../classes/serverMessages.dto';
import { rejects } from 'assert';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  baseURL: string = "http://localhost:3000/";

  token : String;
  user : User;
  catPrograms : Catprogramas[];

  actualMessageServer : String = "";
  successMessage : boolean = false;
  failMessage : boolean = false;
  
  
  constructor(private http: HttpClient) {
    this.token = "";
    this.user = new User();
    this.catPrograms = new Array<Catprogramas>();
   }

  doLogin(username : string, password : string) {
    /* const headers = { 'content-type': 'application/json'}   */
    const data = {username : username , password : password};
    
    return this.http.post(this.baseURL + 'auth', data,/* {'headers':headers} */);
  }

  async getCatprograms(entidad : string) {
    /* const headers = { 'content-type': 'application/json'}   */
    this.http.get(this.baseURL + 'catalogs/catprogramas/'+entidad,{}).subscribe((response : ServerMessage)=>{
      this.catPrograms = response.data;
    });
  }

  async getRespuestas( entidad : string ) {
    return new Promise(async (resolve,reject)=>{
      /* const headers = { 'content-type': 'application/json'}   */
      this.http.get(this.baseURL + 'user/obtener-respuestas',{}).subscribe((response : ServerMessage)=>{
        resolve(response);
      });;
    });
  }

  async saveRespuestas(respuestas : any){
    return new Promise((resolve,reject)=>{
      this.http.post(this.baseURL + 'user/save-respuestas',respuestas).subscribe((response : ServerMessage)=>{
        resolve(response);
      });
    })
  }

  async saveValidations(validaciones : any,idrespuestas){
    return new Promise((resolve,reject)=>{
      this.http.post(this.baseURL + 'user/update-validaciones/'+idrespuestas,validaciones).subscribe((response : ServerMessage)=>{
        resolve(response);
      });
    })
  }

  closeNotification(){
      this.failMessage = false;
      this.successMessage = false;
      this.actualMessageServer = "";
  }

  showNotification(type : number,message : string,time : number){
    this.actualMessageServer = message;
    switch(type){
      case 0:
        this.successMessage = true;
        break;
      case 1:
        this.failMessage = true;
        break;
    }
    this.awaitTime(time,()=>{
      this.failMessage = false;
      this.successMessage = false;
      this.actualMessageServer = "";
    })
  }

  async awaitTime(ms,callback){
    this.sleep(ms).finally(()=>{
      callback();
    })
  }
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
