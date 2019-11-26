import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plant } from './plant.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  readonly plantsUrl = "http://localhost:3333/api/plants";

  constructor(private http :HttpClient) { }

  getPlants(): Observable<Plant[]>{
    return this.http.get<Plant[]>(this.plantsUrl);
              
  }

  getPlant(id:number): Observable<Plant>{
    return this.http.get<Plant>(this.plantsUrl+"/"+id);
              
  }

  updatePlant(id:number, plant:Plant){
    return this.http.put(this.plantsUrl+"/"+id,plant);
  }
}
