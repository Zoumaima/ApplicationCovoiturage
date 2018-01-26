import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Traject} from '../../../../Traject';


@Component({
  selector: 'app-mes-trajects',
  templateUrl: './mes-trajects.component.html',
  styleUrls: ['./mes-trajects.component.css']
})
export class MesTrajectsComponent implements OnInit {


  trajects:Traject[];
 
  public id: string;




  constructor(
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router



  ) { }

  ngOnInit() {


    this.id = localStorage.getItem('id');
    const idd = {
      id: this.id
                }


    this.authService.getTrajects(idd).subscribe(data => {

      this.trajects = data.traject   ;
      console.log(this.trajects);

    },

    err => {
      console.log(err);
      return false;
    });

     }

     onDeleteSubmit(id){
     var trajects = this.trajects;
     this.authService.deleteTraject(id).subscribe(data => {
      if(data){
   for(var i = 0;i < trajects.length;i++){
      if(trajects[i]._id == id){
        trajects.splice(i, 1);
        }  }
       } });
       }


}
