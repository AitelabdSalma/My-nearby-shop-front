import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { LikedShopComponent } from './liked-shop/liked-shop.component';
import { AllshopComponent } from './allshop/allshop.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { FormLoginComponent } from './form-login/form-login.component';
import { FormInscriptionComponent } from './form-inscription/form-inscription.component';
import { AuthGuardService } from './service/login_register/auth-guard.service';
import { LoginGuardService } from './service/login_register/login-guard.service';
import { SelectboxPipe } from './pipe/selectbox.pipe';
import { UniquePipe } from './pipe/unique.pipe';
import { ShopsService } from './service/shop.service';
import { LoginService } from './service/login.service';
import { RegistrationService } from './service/login_register/registration.service';
import { AdministrateurService } from './service/administrateur.service';
import {AuthInterceptorService} from './service/login_register/auth-interceptor.service';
import { WebSocketService } from './service/websocket.service';
import {ParamService} from './service/param.service';

const appRoutes: Routes = [
  {path: 'home' , component : AllshopComponent, canActivate: [AuthGuardService]},
  {path: 'home/AllShops' , component : AllshopComponent, canActivate: [AuthGuardService]},
  {path: 'home/myShops' , component : LikedShopComponent, canActivate: [AuthGuardService]},
 
  {path : 'inscription', component: InscriptionComponent , canActivate: [LoginGuardService]},
  {path : 'login', component : LoginComponent, canActivate: [LoginGuardService]},
 
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuardService]}
  
];

@NgModule({
  declarations: [
    AppComponent,
   
    LikedShopComponent,
    AllshopComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    InscriptionComponent,
    LoginComponent,
    FormLoginComponent,
    FormInscriptionComponent
  ],
  imports: [
    Ng2OrderModule ,
    BrowserModule,
    HttpClientModule,
    
    
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    SelectboxPipe,
    UniquePipe
  ],
  providers: [WebSocketService, ShopsService,   LoginService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    AuthGuardService, LoginGuardService,
    RegistrationService  , ParamService, AdministrateurService],
  bootstrap: [AppComponent]
})
export class AppModule { }
