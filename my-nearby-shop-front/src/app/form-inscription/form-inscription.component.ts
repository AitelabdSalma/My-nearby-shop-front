import { Component, OnInit } from '@angular/core';
import {User} from '../models/Administrateurs';
import {RegistrationService} from '../service/login_register/registration.service';

@Component({
  selector: 'app-form-inscription',
  templateUrl: './form-inscription.component.html',
  styleUrls: ['./form-inscription.component.css']
})
export class FormInscriptionComponent implements OnInit {
  user: User = { idAdmin: null , nom: '', prenom: '', email: '', motDePasse: '' };
  success: boolean = false;
  error: boolean = false;
  constructor(private registerationService: RegistrationService) { }

  ngOnInit() {
  }
  onRegister() {

      var response = this.registerationService.register(this.user).subscribe(
        result => {
          if (result == null) { this.error = true; this.success = false; } else { this.error = false; this.success = true; }
          },
        error => {
          this.success = false;
          this.error = true;
        }
      );
  }
}
