import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plant } from './plant.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  readonly plantUrl = "http://localhost:3333/api/plants";

  constructor(private http :HttpClient) { }

  getPlants(): Observable<Plant[]>{
    return this.http.get<Plant[]>(this.plantUrl);
              
  }
}
