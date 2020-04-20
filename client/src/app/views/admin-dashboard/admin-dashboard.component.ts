import { Component, OnInit } from '@angular/core';
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
  
  constructor(public apiDataService : ApiDataService,) { 
    this.userList = new Array<User>();
    this.selectedUser = new User();
  }

  ngOnInit(): void {
    this.reloadData();
  }

  selectUser(respuesta : User){
    this.selectedUser = JSON.parse(JSON.stringify(respuesta));
    
    console.log(this.selectedUser);
  }

  reloadData(){
    this.userList = [];
    this.selectedUser = new User();
    this.apiDataService.getUsers().then((response : ServerMessage)=>{
      console.log(response);
      this.apiDataService.showNotification(0,response.message,6000);
      this.userList = response.data;
    }).catch((error)=>{
      console.log("error");
      this.apiDataService.showNotification(0,error.message,6000);
      console.log(error);
    })
  }

  updateUser(){
    /* this.apiDataService.saveValidations(this.respuestaSeleccionada.validaciones,this.respuestaSeleccionada.idrespuestas)
      .then((response : ServerMessage)=>{
        this.btnClose.nativeElement.click();
        console.log("cerrando");
        console.log(response);

        this.apiDataService.getRespuestas(this.apiDataService.user.entidad).then((response : ServerMessage)=>{
          this.respuestas = response.data.respuestas;
        }).catch((error)=>{
          console.log("error");
          console.log(error);
        })
      }).catch((error)=>{
        console.log("error");
        console.log(error);
      }) */
  }

}
