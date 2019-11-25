import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Renderer2, ChangeDetectionStrategy, EventEmitter, ChangeDetectorRef  } from '@angular/core';
import { Plant } from 'src/app/shared/plant.model';
import { PlantService } from 'src/app/shared/plant.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {take} from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Subscription, Observable, interval } from 'rxjs';


@Component({
  selector: 'app-plant-detail',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.css'],
  
  
})
export class PlantDetailComponent implements OnInit {
  @ViewChild('alert',{ static: false }) alertDiv;
  @ViewChild('progressWrapper',{ static: false }) progressWrapper;
  @ViewChild('progressStatus',{ static: false }) progressStatus;
  @ViewChild('progress',{ static: false }) progress;

  @ViewChild('water',{ static: false }) water;
  @ViewChild('watering',{ static: false }) watering;
  @ViewChild('cancel',{ static: false }) cancel;
  
  plant:Plant;
 
  constructor(  private plantService: PlantService,
                private route: ActivatedRoute,
                private location: Location,
                private render:Renderer2,
                private changeDetector:ChangeDetectorRef       ) { }

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

  waterPlant(){
    console.log(this.water.nativeElement);
    

    this.render.addClass(this.water.nativeElement,"d-none");
    this.render.removeClass(this.watering.nativeElement,"d-none");
    this.render.removeClass(this.cancel.nativeElement,"d-none");
    this.render.removeClass(this.progressWrapper.nativeElement,"d-none");
    this.render.setAttribute(this.progress.nativeElement,"style","width:50%");
    this.progressStatus.nativeElement.innerText = "53%Uploaded";
  }

 

  cancelWatering(){
    this.reset();
  }

  reset(){
    this.render.addClass(this.cancel.nativeElement,"d-none");
    this.render.addClass(this.watering.nativeElement,"d-none");
    this.render.removeClass(this.water.nativeElement,"d-none");
    this.render.addClass(this.progressWrapper.nativeElement,"d-none");
    this.render.setAttribute(this.progress.nativeElement,"style","width:0%");
  }

 
}
