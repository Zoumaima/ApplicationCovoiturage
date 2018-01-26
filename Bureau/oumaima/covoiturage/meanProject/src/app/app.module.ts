import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AjouterTrajectComponent } from './components/ajouter-traject/ajouter-traject.component';
import { AgmCoreModule, MapsAPILoader,GoogleMapsAPIWrapper } from '@agm/core';
import { MesTrajectsComponent } from './components/mes-trajects/mes-trajects.component';



const appRoutes: Routes = [

{path : '' , component :HomeComponent },
{path : 'register' , component :RegisterComponent },
{path : 'login' , component :LoginComponent },
{path : 'dashboard' , component :DashboardComponent,canActivate:[AuthGuard] },
{path : 'profile' , component :ProfileComponent,canActivate:[AuthGuard] },
{path : 'ajouter-traject' , component :AjouterTrajectComponent,canActivate:[AuthGuard] },
{path : 'trajects' , component :MesTrajectsComponent,canActivate:[AuthGuard] }

]


@NgModule({

  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    AjouterTrajectComponent,
    MesTrajectsComponent,
    
    
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDAYlRCiAEHQ5ly7K0YlrsSLMRBWuXDZY8',
      libraries: ["places"]
    }),
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
  ],
  providers: [ValidateService,AuthService,AuthGuard,GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
