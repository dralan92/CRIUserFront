import { Component, OnInit } from '@angular/core';
import { Plant } from 'src/app/shared/plant.model';
import { PlantService } from 'src/app/shared/plant.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-plant-detail',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.css']
})
export class PlantDetailComponent implements OnInit {
  plant:Plant;
 
  constructor(  private plantService: PlantService,
                private route: ActivatedRoute,
                private location: Location       ) { }

  ngOnInit() {
    this.getPlant();
  }

  getPlant():void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.plantService.getPlant(id)
    .subscribe(
      res=>{this.plant=res;console.log(res);},
      err=>{console.log(err);}
    )
  }

  goBack(): void {
    this.location.back();
  }

}
