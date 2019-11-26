import { Component, OnInit, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import {take} from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Subscription, Observable, interval } from 'rxjs';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CounterComponent implements OnInit {

  
  timeToWater =10;
  

  currentSubscription:Subscription;

  constructor(private changeDetector:ChangeDetectorRef) { }
  @Output() timeToWaterState = new EventEmitter<number>();

  ngOnInit() {
    this.start();
  }

  start(){
    
    this.changeDetector.detectChanges();
    const t:Observable<number> = interval(1000);
    this.currentSubscription = t.pipe(take(this.timeToWater))
                                .map(v=> this.timeToWater - (v+1))
                                .subscribe(v=>{
                                  this.timeToWaterState.emit(v);
                                  this.changeDetector.detectChanges();
                                },
                                err=>{
                                  this.timeToWaterState.error(err);
                                },
                                ()=>{
                                  
                                 
                                  this.changeDetector.detectChanges();
                                });

  }

  

 
}
