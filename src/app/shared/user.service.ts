import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private fb:FormBuilder, private http:HttpClient) { }
  readonly BaseURI = "http://localhost:3333/api";

  formModel = this.fb.group({
    UserName : ['', Validators.required],
    Email : ['', Validators.email],
    Domain : [''],
    Passwords: this.fb.group({
      Password : ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword : ['', Validators.required],
    }, {validators : this.comparePasswords})
  });

  comparePasswords(fb:FormGroup){
    let confirmPasswordCtrl = fb.get('ConfirmPassword');
    if(confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors){
      if(fb.get('Password').value != confirmPasswordCtrl.value)
        confirmPasswordCtrl.setErrors({passwordMismatch:true});
        else
        confirmPasswordCtrl.setErrors(null);
      }
  }

  register(){
    console.log("register");
    var body = {
      UserName : this.formModel.value.UserName,
      Email : this.formModel.value.Email,
      DomainName : this.formModel.value.Domain,
      Password : this.formModel.value.Passwords.Password,
    };
    
    return this.http.post(this.BaseURI + '/applicationuser/register', body);
  }

  login( formData){
    return this.http.post(this.BaseURI + '/applicationuser/login', formData);
  }

  getUserProfile(){
    
    return this.http.get(this.BaseURI+'/userprofile');
  }
}

