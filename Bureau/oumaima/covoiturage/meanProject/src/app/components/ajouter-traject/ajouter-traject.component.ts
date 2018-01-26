import { Component, OnInit } from '@angular/core';
import { ElementRef, NgZone,ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Directive,  Input} from '@angular/core';





@Component({
  selector: 'app-ajouter-traject',
  templateUrl: './ajouter-traject.component.html',
  styleUrls: ['./ajouter-traject.component.css']
})

export class AjouterTrajectComponent implements OnInit {

  user: Object;
 
  date_depart: Date;
  heure_depart: String;
  nbr_place: Number;
  prix: Number;
  description: String;
  id : String ;
  nom : String;
  prenom : String;
  age : String;
  telephone : String;
  email : String;
 
  public villeD : string;
  public villeA : string;
  public adresse_depart : string;
  public adresse_arrivee : string;
  public latA: number;
  public lngA: number;
  public latD: number;
  public lngD: number;
  public searchControl1: FormControl;
  public searchControl2: FormControl;
  


  public zoom: number;

@ViewChild("search")
public searchElementRef: ElementRef;
@ViewChild("search2")
public searchElementRef2: ElementRef;


  constructor(
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {
    
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });
    
        const idd = {
          id: localStorage.getItem('id')
        }





    //set google maps defaults
    this.zoom = 4;
    this.latA = 43.3639;
    this.lngA = 3.5238;
    this.latD = 43.3639;
    this.lngD = 3.5238;
    this.id = localStorage.getItem('id');
    this.nom = localStorage.getItem('nom');
    this.prenom = localStorage.getItem('prenom');
    this.age = localStorage.getItem('age');
    this.telephone = localStorage.getItem('telephone');
    this.email = localStorage.getItem('email');
    


    //create search FormControl
    this.searchControl1 = new FormControl();
    this.searchControl2 = new FormControl();

    //set current position
    //this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place1: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.adresse_depart = place1.formatted_address;
          this.villeD = place1.vicinity;

          //verify result
          if (place1.geometry === undefined || place1.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latD = place1.geometry.location.lat();
          this.lngD = place1.geometry.location.lng();
          this.zoom = 12;
        });
      });
    }
  );
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef2.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place2: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.adresse_arrivee = place2.formatted_address;
          this.villeA = place2.vicinity;


          //verify result
          if (place2.geometry === undefined || place2.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latA = place2.geometry.location.lat();
          this.lngA = place2.geometry.location.lng();
          this.zoom = 5;
        });
      });
    }
  );


  }
  onSaveSubmit(){

    const traject = {

      /*

      posted_by : {      id: this.id,
                         nom: this.nom,
                         prenom: this.prenom,
                         age: this.age,
                         telephone: this.telephone,
                         email: this.email
                         
                     }   ,*/
    //email : this.email,
    villeD : this.villeD,
    adresse_depart:this.adresse_depart,
    latD : this.latD,
    lngD:this.lngD,
    villeA : this.villeA,
    adresse_arrivee :this.adresse_arrivee,
    latA : this.latA,
    lngA : this.lngA,
    date_depart : this.date_depart,
    heure_depart : this.heure_depart,
    nbr_place : this.nbr_place,
    prix : this.prix,
    description : this.description,
    }


    this.authService.saveTraject(traject).subscribe(data => {
      console.log("Bonjour : " + this.email);
      console.log(traject);

      if(data.success){
        this.flashMessage.show('Le traject a ete ajouter ', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/ajouter-traject']);
      } else {
        this.flashMessage.show('l\'opération a échouer', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/ajouter-traject']);
      }
    });


  }
 
}
