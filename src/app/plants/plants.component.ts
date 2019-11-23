import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plant } from '../shared/plant.model';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit {

   plants : Plant[] = [
    {PlantId:1, PlantName:"Mango Tree"},
    {PlantId:2, PlantName:"Papaya Tree"},
    {PlantId:3, PlantName:"Banana Tree"},
    {PlantId:4, PlantName:"Coconut Tree"},
    {PlantId:5, PlantName:"Jackfruit Tree"}

  ];

  selectedPlant:Plant;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  onSelect(plant:Plant):void{
    this.selectedPlant = plant;

  }

}
