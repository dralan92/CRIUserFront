import { Injectable } from '@angular/core';
import { CriQuestion } from './cri-question.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  readonly tierUrl = "http://localhost:3333/api/criqns/tiers";
  readonly countryUrl = "http://localhost:3333/api/criqns/countries";

  formData:CriQuestion;
  
  constructor(private http :HttpClient) { }

  getCountries(){
    return this.http.get(this.countryUrl);
  }

  getTiers(){
    return this.http.get(this.tierUrl);
  }
  
  testMethod(){
    console.log("Hiiiii");
    console.log(this.formData);


  }
}

