import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plant } from '../shared/plant.model';
import { PlantService } from '../shared/plant.service';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit {

   plants : Plant[];

  selectedPlant:Plant;

  constructor(private router:Router,
              private plantService:PlantService) { }

  ngOnInit() {
    console.log("initPlants");
    this.plantService.getPlants().subscribe(
      res=>{
        this.plants=res;
        console.log(this.plants);
      },
      err=>{console.log(err);}
    );

  }

  onSelect(plant:Plant):void{
    this.selectedPlant = plant;

  }

}
