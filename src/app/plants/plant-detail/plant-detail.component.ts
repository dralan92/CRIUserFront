import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Renderer2, ChangeDetectionStrategy, EventEmitter, ChangeDetectorRef, Input  } from '@angular/core';
import { Plant } from 'src/app/shared/plant.model';
import { PlantService } from 'src/app/shared/plant.service';
import { ActivatedRoute } from '@angular/router';
import { Location, getLocaleDateTimeFormat } from '@angular/common';
import {take} from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Subscription, Observable, interval } from 'rxjs';
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-plant-detail',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.css'],
  
  
})
export class PlantDetailComponent implements OnInit {
  @Input() userName:string;
  @ViewChild('alert',{ static: false }) alertDiv;
  @ViewChild('progressWrapper',{ static: false }) progressWrapper;
  @ViewChild('progressStatus',{ static: false }) progressStatus;
  @ViewChild('progress',{ static: false }) progress;

  @ViewChild('water',{ static: false }) water;
  @ViewChild('watering',{ static: false }) watering;
  @ViewChild('cancel',{ static: false }) cancel;

  
  userDetails;
  plant:Plant;

  timeSinceLastWatered;
  remainingTimeToWater=0;
  
 
  constructor(  private plantService: PlantService,
                private userService: UserService,
                private route: ActivatedRoute,
                private location: Location,
                private render:Renderer2,
                private changeDetector:ChangeDetectorRef       ) { }

  ngOnInit() {
    
    this.getPlant();
    this.userService.getUserProfile().subscribe(
      res=>{
        this.userDetails = res;
      },
      err=>{
        console.log(err);
      }
    );
    
  }

  getPlant():void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.plantService.getPlant(id)
    .subscribe(
      res=>{
        this.plant=res;
        
        this.timeSinceLastWatered = new Date().getTime() - new Date(this.plant.lastWateredOn).getTime();
        
      },
      err=>{console.log(err);}
    )
  }
  getTimeToWater(newValue : any){
    this.remainingTimeToWater = newValue;
    
  if(this.remainingTimeToWater==0){
    console.log("Watering Completed");
    this.plant.lastWateredBy=this.userDetails.userName;
    
    this.plantService.updatePlant(this.plant.plantId,this.plant).subscribe(
      res=>{this.getPlant();},
      err=>{}
    )
    this.reset();
  }
  }
  goBack(): void {
    this.location.back();
  }

  waterPlant(){
   
   
    this.remainingTimeToWater=10;
    
    this.render.addClass(this.water.nativeElement,"d-none");
    this.render.removeClass(this.watering.nativeElement,"d-none");
    this.render.removeClass(this.cancel.nativeElement,"d-none");
    this.render.removeClass(this.progressWrapper.nativeElement,"d-none");
    //this.render.setAttribute(this.progress.nativeElement,"style","width:50%");
    //this.progressStatus.nativeElement.innerText = "53%Uploaded";
  }

 

  cancelWatering(){
    this.reset();
  }

  reset(){
    this.remainingTimeToWater =0;
    this.render.addClass(this.cancel.nativeElement,"d-none");
    this.render.addClass(this.watering.nativeElement,"d-none");
    this.render.removeClass(this.water.nativeElement,"d-none");
    this.render.addClass(this.progressWrapper.nativeElement,"d-none");
    this.render.setAttribute(this.progress.nativeElement,"style","width:0%");
  }

 
}
