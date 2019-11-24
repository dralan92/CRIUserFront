import { Component, OnInit } from '@angular/core';
import { Plant } from 'src/app/shared/plant.model';
import { PlantService } from 'src/app/shared/plant.service';

@Component({
  selector: 'app-plant-dashboard',
  templateUrl: './plant-dashboard.component.html',
  styleUrls: ['./plant-dashboard.component.css']
})
export class PlantDashboardComponent implements OnInit {
  plants: Plant[];

  constructor(private plantService:PlantService) { }

  ngOnInit() {
    this.plantService.getPlants().subscribe(
      res=>{
        this.plants=res;
        console.log(this.plants);
      },
      err=>{console.log(err);}
    );
  }


}
