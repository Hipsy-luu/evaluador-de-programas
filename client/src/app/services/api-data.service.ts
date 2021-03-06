import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../classes/user.class';
import { CatProgramas } from '../classes/catprogramas.class';
import { ServerMessage } from '../classes/serverMessages.dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  //Url testeo locales
  //baseURL: string = "http://localhost:3000/";
  //Url producción
  //baseURL: string = "https://evaluadorapi.enbibo.com/";
  baseURL: string = "http://clasificadorapi.sds2.chihuahua.gob.mx/";
  //baseURL: string = "https://evaluadorapi.com/";

  token : String;
  user : User;
  catPrograms : CatProgramas[];

  actualMessageServer : String = "";
  successMessage : boolean = false;
  failMessage : boolean = false;
  alreadyLoged : Boolean = false;
  
  constructor(private http: HttpClient,private route: Router,) {
    this.token = "";
    

    this.user = new User();
    let localUser = localStorage.getItem('user');
    

    if(!localUser){
      console.log("Primer uso");
      localStorage.setItem('user', JSON.stringify(this.user));
    }else{
      this.user = JSON.parse(localUser);
    }
    

    this.catPrograms = new Array<CatProgramas>();
   }

  checkLogin(succesCallBack,errorCallBack){
    /* console.log(this.user); */
    if(!this.alreadyLoged){
      if(this.user.password.length > 1){
        /* console.log("con sesion"); */
        this.doLogin(this.user.usuario,this.user.password).subscribe((result : ServerMessage)=>{
          if(result.error){
            // en caso de que en el servidor NO haga el login
            errorCallBack(result);
          }else{
            // en caso de que en el servidor SI haga el login
            
            let newSavedPass = new String(this.user.password);
            this.user = result.data.user;
            this.user.password = newSavedPass.toString();
            this.token = result.data.token;
            this.user.token = result.data.token;
            localStorage.setItem('user', JSON.stringify(this.user));
            succesCallBack(result)
          }
        },(error)=>{
          //this.showNotification(1,"Ups algo salio mal!",6000);
          errorCallBack(error);
        });
      }else{
        /* console.log("sin sesion"); */
        errorCallBack("Sin sesion");
      }
    }else{
      /* console.log("aun sin logear"); */
      errorCallBack("aun sin logear");
    }
  }

  doLogin(username : string, password : string) {
    /* const headers = { 'content-type': 'application/json'}   */
    const data = {username : username , password : password};
    
    return this.http.post(this.baseURL + 'auth', data,/* {'headers':headers} */);
  }

  logOut(){
    localStorage.setItem('user', JSON.stringify(new User()));
    this.user = JSON.parse( localStorage.getItem('user') );
    this.alreadyLoged = false;
    
    this.route.navigateByUrl('/')
  }

  async getCatprograms(entidad : string) {
    /* const headers = { 'content-type': 'application/json'}   */
    this.http.get(this.baseURL + 'catalogs/CatProgramas/'+entidad,{}).subscribe((response : ServerMessage)=>{
      this.catPrograms = response.data;
    });
  }

  async getRespuestas( entidad : string ) {
    return new Promise(async (resolve,reject)=>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.user.token
      })
       
      this.http.get(this.baseURL + 'user/obtener-respuestas',{ headers: headers }).subscribe((response : ServerMessage)=>{
        resolve(response);
      });;
    });
  }

  async getUserResponses( entidad : string ) {
    return new Promise(async (resolve,reject)=>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.user.token
      })
       
      this.http.get(this.baseURL + 'user/user-responses',{ headers: headers }).subscribe((response : ServerMessage)=>{
        resolve(response);
      });;
    });
  }

  async getUsers() {
    return new Promise(async (resolve,reject)=>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.user.token
      });
        //console.log("intentando");
        
        this.http.get(this.baseURL + 'user/user-list',{ headers: headers }).subscribe((response : ServerMessage)=>{
          //console.log("comunico");
          resolve(response);
        },(error)=>{
          //console.log("error");
          reject(error);
        });
      
    });
  }

  async updateCreateUser(userData : User){
    return new Promise((resolve,reject)=>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.user.token
      });

      this.http.post(this.baseURL + 'user/create-edit-user',userData,{ headers: headers }).subscribe((response : ServerMessage)=>{
        resolve(response);
      });
    })
  }

  async saveRespuestas(respuestas : any){
    return new Promise((resolve,reject)=>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.user.token
      });

      this.http.post(this.baseURL + 'user/save-respuestas',respuestas,{ headers: headers }).subscribe((response : ServerMessage)=>{
        resolve(response);
      });
    })
  }

  async saveValidations(validaciones : any,idrespuestas){
    return new Promise((resolve,reject)=>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.user.token
      });

      this.http.post(this.baseURL + 'user/update-validaciones/'+idrespuestas,validaciones,{ headers: headers }).subscribe((response : ServerMessage)=>{
        resolve(response);
      });
    })
  }

  async sendEmail(data : any){
    return new Promise((resolve,reject)=>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.user.token
      });

      this.http.post(this.baseURL + 'user/enviar-validacion/',data,{ headers: headers }).subscribe((response : ServerMessage)=>{
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
