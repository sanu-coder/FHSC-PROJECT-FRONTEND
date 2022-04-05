import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {MapInfoWindow, MapMarker} from '@angular/google-maps';
import { Router,ActivatedRoute } from '@angular/router';
import { FhscServiceService } from '../fhsc-service.service';
@Component({
  selector: 'app-map-locate',
  templateUrl: './map-locate.component.html',
  styleUrls: ['./map-locate.component.scss']
})
export class MapLocateComponent implements OnInit {
  title = 'My first AGM project';
  lat = 22.080387492552596;
  lng = 82.15589598965036;
  zoom = 15;
  position:any;
  data:any;
  apiLoaded: Observable<boolean>;
  datas:any;
  dataId :any;
  type:any;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  constructor(httpClient: HttpClient,private route:ActivatedRoute,private api : FhscServiceService) {

    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyDgD_v7-uWEF2kFnQXCezS2Pp3EesA28IA', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
      );
    }
 
  ngOnInit(): void {
    this.dataId = this.route.snapshot.paramMap.get('id');
    this.type = this.route.snapshot.paramMap.get('type');
    if(this.type == 'H'){
      this.api.getHospitals().subscribe((data:any)=>{
        this.datas = data;
        this.datas = this.datas.data;
        let index = this.datas.findIndex((data:any)=>data._id===this.dataId);
        this.data = this.datas[index];
        console.log(this.data)
        this.position = {
          lat :parseInt( this.data.lat),
          lng : parseInt( this.data.lng),
        }
      })
    }
    if(this.type == 'F'){
      this.api.getFoods().subscribe((data:any)=>{
        this.datas = data;
        this.datas = this.datas.data;
        let index = this.datas.findIndex((data:any)=>data._id===this.dataId);
        this.data = this.datas[index];
        console.log(this.data)
        this.position = {
          lat :parseInt( this.data.lat),
          lng : parseInt( this.data.lng),
        }
      })
    }
    if(this.type == 'S'){
      this.api.getShoppings().subscribe((data:any)=>{
        this.datas = data;
        this.datas = this.datas.data;
        let index = this.datas.findIndex((data:any)=>data._id===this.dataId);
        this.data = this.datas[index];
        console.log(this.data)
        this.position = {
          lat :parseInt( this.data.lat),
          lng : parseInt( this.data.lng),
        }
      })
    }
  }
  

}