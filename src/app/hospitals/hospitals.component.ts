import { Component, OnInit } from '@angular/core';
import { FhscServiceService } from '../fhsc-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss']
})
export class HospitalsComponent implements OnInit {
  hospitals:any;
  hospitalId :any;
  type:any;
  filteredHospitals:any;
  specialists:any;
  distances : any;
  selectedDistances:any;
  ratings:any;
  union_arrays :any;
  arr1 : any;
  arr2 : any;
  arr3:any;
  latUser:any;
  lngUser:any;
  cities: Array<any> = [];
  selectedOwnwership: Array<any> = [
    { item_id: 4, item_text: "Pune" },
    { item_id: 6, item_text: "Navsari" }
  ];
  selectedSpecialist:any;
  ownership:any;
  selectedRatings:any;
  dropdownSettings: any = {};
  new_hospitals :any;
  specialistDropdownSettings:any;
  title = 'multiselectdropdown';
   constructor(private api : FhscServiceService,private router: Router,) {
    this.union_arrays = [];
    
   }
geolocationCall = (lat:any, lng:any) => {
    let d: number;
      
      const R = 6371e3; // metres
      const φ1 = this.latUser * Math.PI / 180; // φ, λ in radians
      const φ2 = lat * Math.PI / 180;
      const Δφ = (this.latUser - lat) * Math.PI / 180;
      const Δλ = (this.lngUser - lng) * Math.PI / 180;
      const a = (Math.sin(Δφ / 2) * Math.sin(Δφ / 2)) +
          (Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2));
      const c = 2 * Math.asin(Math.sqrt(a));
       d = R * c;
  
  return d/1000;
}
  userLocation=async()=>{
    console.log("Function called")
    if (navigator.geolocation){
      await navigator.geolocation.getCurrentPosition((position :any) =>{
        this.latUser = position.coords.latitude;
        this.lngUser   = position.coords.longitude;
        console.log(this.latUser);
        console.log(this.lngUser);
      });
    }
  }
   filter(event:any){
     console.log(event);
   }
   displayDetails(hospital:any){
     console.log(hospital._id);
    this.router.navigate(['/map/','H',hospital._id]);
   }
   onItemSelect(item: any) {
    console.log(item);
    }
    onSelectAll(items: any) {
      console.log(items);
    }
    onBooking(url :any){
      window.location.href=url;
    }
    website(url:any){
      window.location.href=url;
    }
    union(a1 :any, a2:any) {
      var result = [];
      for (var i = 0; i < a1.length; i++) {
          result.push(a1[i]);
      }
      for (i = 0; i < a2.length; i++) {
        if (a1.indexOf(a2[i]) === -1) {
          result.push(a2[i]);
        }
      }
      return result;
    }
    onSelect(events:any){
      this.arr3 = [];
      this.new_hospitals = this.hospitals;
      // Ownership
      if(this.selectedOwnwership.length!=0){
        this.arr2 = [];
        for(let event of this.selectedOwnwership){
          this.arr1 = this.hospitals.filter((hospital:any)=> hospital.type === event.item_value);
          this.arr1 = this.union(this.arr2,this.arr1);
          this.arr2 = this.arr1;
        }
        // this.arr3 = this.arr2.filter((item:any)=>this.arr1.includes(item));
        if(this.arr3.length!=0){
          this.arr3 = this.arr2.filter((item:any)=>this.arr3.includes(item));
        }
        else{
          this.arr3 = this.arr2.filter((item:any)=>this.arr1.includes(item));
        }
        this.new_hospitals = this.arr3;
      }
     
      console.log(this.arr3);
      // Features
      if(this.selectedSpecialist.length!=0){
        this.arr2 =[];
        for(let event of this.selectedSpecialist){
          this.arr1 = this.hospitals.filter((hospital:any)=> hospital.features.includes(event.item_value));
          this.arr1 = this.union(this.arr2,this.arr1);
          this.arr2 = this.arr1;
        }

        // this.arr3 = this.arr2.filter((item:any) => this.arr3.includes(item));
        if(this.arr3.length!=0){
          this.arr3 = this.arr2.filter((item:any)=>this.arr3.includes(item));
        }
        else{
          this.arr3 = this.arr2.filter((item:any)=>this.arr1.includes(item));
        }
        console.log(this.arr3);
        this.new_hospitals = this.arr3;
      }
      
      // ratings
      if(this.selectedRatings.length!=0){
        this.arr2 =[];
        for(let event of this.selectedRatings){
        
          if(event.item_value === "less_than_2"){
            this.arr1 = this.new_hospitals.filter((hospital : any) => parseFloat(hospital.rating)  < 2.0);
          }
          else if(event.item_value === "more_than_2"){
            this.arr1 = this.new_hospitals.filter((hospital : any) => parseFloat(hospital.rating) > 2.0)
          }
          else if(event.item_value === "more_than_3"){
            this.arr1 = this.new_hospitals.filter((hospital : any) => parseFloat(hospital.rating) > 3.0)
          }
          else if(event.item_value === "more_than_4"){
            this.arr1 = this.new_hospitals.filter((hospital : any) => parseFloat(hospital.rating) > 4.0);
          }
          else if(event.item_value === "bet_1_and_2"){
            this.arr1 = this.new_hospitals.filter((hospital : any) => parseFloat(hospital.rating) >= 1.0 &&  parseFloat(hospital.rating) < 2.0);
          }
          else if(event.item_value === "bet_2_and_3"){
            this.arr1 = this.new_hospitals.filter((hospital : any) => parseFloat(hospital.rating) >= 2.0 && parseFloat(hospital.rating) < 3.0)
          }
          else if(event.item_value === "bet_3_and_4"){
            this.arr1 = this.new_hospitals.filter((hospital : any) =>  parseFloat(hospital.rating) >= 3.0 && parseFloat(hospital.rating) < 4.0)
          }
          else if(event.item_value === "bet_4_and_5"){
            this.arr1 = this.new_hospitals.filter((hospital : any) =>  parseFloat(hospital.rating) >= 4.0 && parseFloat(hospital.rating) < 5.0)
          }
          console.log(this.arr1);
          this.arr1 = this.union(this.arr2,this.arr1);
          this.arr2 = this.arr1;
        }
        // this.arr3 = this.arr2.filter((item:any) => this.arr3.includes(item));
        if(this.arr3.length!=0){
          this.arr3 = this.arr2.filter((item:any)=>this.arr3.includes(item));
        }
        else{
          this.arr3 = this.arr2.filter((item:any)=>this.arr1.includes(item));
        }
        console.log(this.arr3);
        this.new_hospitals = this.arr3;
      }
      
      // distance 
      if(this.selectedDistances.length!=0){
        this.arr2 =[];
        for(let event of this.selectedDistances){
          if(event.item_value === "less_than_2"){
            this.arr1 = this.new_hospitals.filter((hospital : any) =>  this.geolocationCall(hospital.lat, hospital.lng) < 2)
          }
          else if(event.item_value === "less_than_4"){
            this.arr1 = this.new_hospitals.filter((hospital : any) =>  this.geolocationCall(hospital.lat, hospital.lng) < 4)
          }
          else if(event.item_value === "less_than_7"){
            this.arr1 = this.new_hospitals.filter((hospital : any) =>  this.geolocationCall(hospital.lat, hospital.lng) < 7)
          }
          else if(event.item_value === "more_than_7"){
            this.arr1 = this.new_hospitals.filter((hospital : any) =>  this.geolocationCall(hospital.lat, hospital.lng) > 7)
          }
          this.arr1 = this.union(this.arr2,this.arr1);
          this.arr2 = this.arr1;
        }
        // this.arr3 = this.arr2.filter((item:any) => this.arr3.includes(item));
        if(this.arr3.length!=0){
          this.arr3 = this.arr2.filter((item:any)=>this.arr3.includes(item));
        }
        else{
          this.arr3 = this.arr2.filter((item:any)=>this.arr1.includes(item));
        }
        this.new_hospitals = this.arr3;
      }
    }
   
  ngOnInit(): void {
    
    this.api.getHospitals().subscribe((data:any)=>{
      console.log(data);
      this.hospitals = data;
      this.hospitals = this.hospitals.data;
      this.filteredHospitals = this.hospitals;
      console.log(this.hospitals);
      this.new_hospitals = this.hospitals
    });
    this.selectedOwnwership = [
    ];
    this.ownership = [
      {item_id:1,item_text : "Private" , item_value : "private"},
      {item_id:2,item_text : "Government", item_value : "government"}
    ];
    this.selectedSpecialist = [
    ];
    this.specialists = [
      {item_id:1,item_text : "Children", item_value: "children"},
      {item_id:2,item_text : "Eye-Specialist", item_value:"eye-specialist"},
      {item_id:3,item_text : "Vaccination Centres", item_value:"coronavirus-vaccination"},
      {item_id:4,item_text : "Physician", item_value:"physicians"},
      {item_id:5,item_text : "Maternity", item_value:"pregnant"},
      {item_id:6,item_text : "Asthama", item_value : "asthma"},
      {item_id:7,item_text : "Multispeciality",item_value : "multi-speciality"},
      {item_id:8,item_text : "Ulcer" , item_value:"ulcer"},
      {item_id:9,item_text : "Breast",item_value:"breast"},
      {item_id:10,item_text : "Thyroid",item_value:"thyroid"},
      {item_id:11,item_text : "Cancer",item_value:"cancer"},
      {item_id:12,item_text : "Knee Pain",item_value:"knee-pain"},
      {item_id:13,item_text : "Dentist",item_value:"dentist"},
      {item_id:14,item_text : "Diabeties",item_value:"diabeties"},
      {item_id:15,item_text : "Skin",item_value:"skin"},
      {item_id:16,item_text : "Ear",item_value:"ear"},
      {item_id:17,item_text : "Nose",item_value:"nose"},
      {item_id:18,item_text : "Throat",item_value:"throat"},
    ];
    this.ratings = [
      {item_id:1,item_text : "less than 2.0 ",item_value:"less_than_2"},
      {item_id:2,item_text : "more than 2.0 ",item_value:"more_than_2"},
      {item_id:3,item_text : "more than 3.0 ",item_value:"more_than_3"},
      {item_id:4,item_text : "more than 4.0 ",item_value:"more_than_4"},
      {item_id:5,item_text : "between 1.0 and 2.0 ",item_value:"bet_1_and_2"},
      {item_id:6,item_text : "between 2.0 and 3.0  ",item_value:"bet_2_and_3"},
      {item_id:7,item_text : "between 3.0 and 4.0  ",item_value:"bet_3_and_4"},
      {item_id:7,item_text : "between 4.0 and 5.0  ",item_value:"bet_4_and_5"},

    ];
    this.distances = [
      {item_id:1,item_text : "less than 2km",item_value:"less_than_2"},
      {item_id:2,item_text : "less than 4km",item_value:"less_than_4"},
      {item_id:3,item_text : "less than 7km",item_value:"less_than_7"},
      {item_id:4,item_text : "7km or above",item_value:"more_than_7"},
    ]
    this.selectedRatings =[];
    this.selectedDistances = [];
    this.specialistDropdownSettings = {
      singleSelection: false,
      idField: "item_value",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 0,
      allowSearchFilter: true
    };
    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_value",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 0,
      allowSearchFilter: false
    };
    this.userLocation();
  }

}
