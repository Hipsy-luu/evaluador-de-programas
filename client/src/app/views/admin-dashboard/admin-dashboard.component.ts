import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiDataService } from '../../services/api-data.service';
import { User } from '../../classes/user.class';
import { ServerMessage } from '../../classes/serverMessages.dto';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  selectedUser : User;
  userList : User[];
  userListFiltered : User[];
  isNew : boolean;
  password : string;
  newPassword : string;

  searchValue: String = "";
  page = 1;
  pageSize = 10;
  entities : any[] = [];
  selectedEntitie = "Todas";

  @ViewChild('OpenEditUser') openEditUser : ElementRef;
  @ViewChild('BtnCloseEditModal') btnCloseEditModal : ElementRef;
  
  constructor(public apiDataService : ApiDataService,) { 
    this.userList = new Array<User>();
    this.userListFiltered = new Array<User>();
    this.selectedUser = new User();
    this.password = "";
    this.newPassword = "";
    this.isNew = false;
  }

  ngOnInit(): void {
    this.reloadData();
  }

  selectUser(respuesta : User){
    this.selectedUser = JSON.parse(JSON.stringify(respuesta));
    this.selectedUser.password = "";
    this.password = "";
    this.newPassword = "";
    this.isNew = false;
    //console.log(this.selectedUser);
    this.openEditUser.nativeElement.click();
  }

  selectNewUser(){
    this.selectedUser = new User();
    this.password = "";
    this.newPassword = "";
    this.isNew = true;
    //console.log(this.selectedUser);
    this.openEditUser.nativeElement.click();
  }

  reloadData(){
    this.userList = [];
    this.userListFiltered = Array.from(this.userList);
    this.selectedUser = new User();
    this.apiDataService.getUsers().then((response : ServerMessage)=>{
      //console.log(response);
      //this.apiDataService.showNotification(0,response.message,6000);
      this.userList = response.data;
      this.userListFiltered = Array.from(this.userList);
      this.entities = [... new Set(this.userList.map(data => data.entidad))];
    }).catch((error)=>{
      console.log("error");
      this.apiDataService.showNotification(0,error.message,6000);
      console.log(error);
    });
  }

  changeTypeUser(newType : number){
    this.selectedUser.rolusuario = newType;
  }

  updateUser(){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if( !re.test( String( this.selectedUser.email).toLowerCase() ) ){
      this.apiDataService.showNotification(1,"Email invalido",6000);
    }else if(this.isNew == true && this.password == ""){
      this.apiDataService.showNotification(1,"La contraseña no puede estar vaciá",6000);
    }else if(this.password.length > 0 && this.password.length < 8 ){
      this.apiDataService.showNotification(1,"La contraseña debe tener mínimo 8 caracteres",6000);
    }else{
      if(this.password != this.newPassword){
        this.apiDataService.showNotification(1,"Las contraseñas no coinciden",6000);
      }else{
        this.selectedUser.password = this.password;
        this.apiDataService.updateCreateUser(this.selectedUser)
        .then((response : ServerMessage)=>{
          console.log("cerrando");
          console.log(response);
          
          if(response.error == true){
            this.apiDataService.showNotification(1,response.message,6000);
          }else{
            this.reloadData();
            this.btnCloseEditModal.nativeElement.click();
            this.apiDataService.showNotification(0,response.message,6000);
          }
        }).catch((error)=>{
          console.log("error");
          console.log(error);
        });
      }
    }
  }

  filterByPEmail(event) {
    let searchValueTemp = event.charAt(0).toLowerCase() + event.slice(1);

    if (this.searchValue == "") {
      this.userListFiltered = Array.from(this.userList);
    } else {
      this.userListFiltered = this.userList.filter(function (user) {
        let fixed = user.email.charAt(0).toUpperCase() + event.slice(1);
        return user.email.toLowerCase().includes(searchValueTemp);
      });
    }
  }

  changeEntitieSelected(opc : number){
    let searchValueTemp = opc.toString().charAt(0).toLowerCase() + opc.toString().slice(1);


    switch (opc) {
      case -1:
        this.selectedEntitie = "Todas";
        this.userListFiltered = Array.from(this.userList);
        break;
    
      default:
        this.selectedEntitie = opc.toString();

        this.userListFiltered = this.userList.filter(function (user) {
          let fixed = user.entidad.charAt(0).toUpperCase() + opc.toString().slice(1);
          return user.entidad.toLowerCase().includes(searchValueTemp);
        });
        break;
    }
  }
}
