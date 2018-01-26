import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  nom: String;
  prenom: String;
  age: String
  adresse: String;
  telephone: Number;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router


  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      nom: this.nom,
      prenom: this.prenom,
      age: this.age,
      adresse: this.adresse,
      telephone: this.telephone,
      email: this.email,
      password: this.password
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)){
    this.flashMessage.show('Veuillez remplir tous les champs', {cssClass: 'alert-danger', timeout: 3000});
          return false;

    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
    this.flashMessage.show('Veuillez entrez une adresse mail valide', {cssClass: 'alert-danger', timeout: 3000});
         return false;
    }

    // Register user
     this.authService.registerUser(user).subscribe(data => {
       if(data.success){
         this.flashMessage.show('Bienvenue parmis nous, vous pouvez vous connecter', {cssClass: 'alert-success', timeout: 3000});
         this.router.navigate(['/login']);
       } else {
         this.flashMessage.show('Erreur ', {cssClass: 'alert-danger', timeout: 3000});
         this.router.navigate(['/register']);
       }
     });

  }

}
