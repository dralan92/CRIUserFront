import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { QuestionService } from '../shared/question.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  userDetails;
  

  constructor(private router:Router, 
    private service : UserService, 
    private qService: QuestionService) { }

countries:any;
tiers:any;

  ngOnInit() {
    this.initializeForm();
    this.getCountries();
    this.getTiers();
    this.qService.testMethod();
    this.service.getUserProfile().subscribe(
      res=>{
        this.userDetails = res;
        
        this.qService.formData.Username = this.userDetails.userName;

      },
      err=>{
        console.log(err);
      }
    );
  }

  

  onSubmit(form:NgForm){
    
    
  }
 
  initializeForm(form?:NgForm){
    if(form!=null)
    form.form.reset();
    
    this.qService.formData={
      Username:"",
      CountryFk:0,
      TierFk:0
    }

  }


  getCountries(){
    this.qService.getCountries().subscribe(
      res=>{
        this.countries = res;
        
      },
      err=>{
        console.log(err);
      }
    );
  }

  getTiers(){
    this.qService.getTiers().subscribe(
      res=>{
        this.tiers = res;
        
      },
      err=>{
        console.log(err);
      }
    );
  }
onLogout(){
localStorage.removeItem('token');
this.router.navigate(['/user/login']);
}
}
