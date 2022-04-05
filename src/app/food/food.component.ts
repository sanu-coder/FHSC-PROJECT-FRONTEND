import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FhscServiceService } from '../fhsc-service.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  dropdownSettings:any;
  type:any;
  selectedType:any;
  specialistDropdownSettings:any;
  food_filter:any;
  selectedFoodFilter:any;
  distances:any;
  selectedRatings:any;
  selectedDistances:any;
  ratings : any;
  foods:any;
  arr3:any;
  arr2:any;
  arr1:any;
  new_foods:any;
  lngUser:any;
  latUser:any;
  constructor(private api : FhscServiceService, private router: Router) { }
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
  onSelect(event:any){
    this.arr3 = [];
    this.new_foods = this.foods;
      // Ownership
      // console.log(this.selectedType);
      if(this.selectedType.length!=0){
        this.arr2 = [];
        for(let event of this.selectedType){
          this.arr1 = this.foods.filter((food:any)=> food.type === event.item_value);
          this.arr1 = this.union(this.arr2,this.arr1);
          this.arr2 = this.arr1;
        }
        if(this.arr3.length!=0){
          this.arr3 = this.arr2.filter((item:any)=>this.arr3.includes(item));
        }
        else{
          this.arr3 = this.arr2.filter((item:any)=>this.arr1.includes(item));
        }
        this.new_foods = this.arr3;
      }
      if(this.selectedFoodFilter.length!=0){
        this.arr2 = [];
        for(let event of this.selectedFoodFilter){
          this.arr1 = this.foods.filter( (food : any) => food.features.includes(event.item_value));
          
          this.arr1 = this.union(this.arr2,this.arr1);
          this.arr2 = this.arr1;
        }
        if(this.arr3.length!=0){
          this.arr3 = this.arr2.filter((item:any)=>this.arr3.includes(item));
        }
        else{
          this.arr3 = this.arr2.filter((item:any)=>this.arr1.includes(item));
        }
        this.new_foods = this.arr3;
      }
      if(this.selectedRatings.length!=0){
        this.arr2 = [];
        console.log(this.selectedRatings);
        for(let event of this.selectedRatings){
        
          if(event.item_value === "less_than_2"){
            this.arr1 = this.foods.filter((hospital : any) => parseFloat(hospital.rating)  < 2.0);
          }
          else if(event.item_value === "more_than_2"){
            this.arr1 = this.foods.filter((hospital : any) => parseFloat(hospital.rating) > 2.0)
          }
          else if(event.item_value === "more_than_3"){
            this.arr1 = this.foods.filter((hospital : any) => parseFloat(hospital.rating) > 3.0)
          }
          else if(event.item_value === "more_than_4"){
            this.arr1 = this.foods.filter((hospital : any) => parseFloat(hospital.rating) > 4.0);
          }
          else if(event.item_value === "bet_1_and_2"){
            this.arr1 = this.foods.filter((hospital : any) => parseFloat(hospital.rating) >= 1.0 &&  parseFloat(hospital.rating) < 2.0);
          }
          else if(event.item_value === "bet_2_and_3"){
            this.arr1 = this.foods.filter((hospital : any) => parseFloat(hospital.rating) >= 2.0 && parseFloat(hospital.rating) < 3.0)
          }
          else if(event.item_value === "bet_3_and_4"){
            this.arr1 = this.foods.filter((hospital : any) =>  parseFloat(hospital.rating) >= 3.0 && parseFloat(hospital.rating) < 4.0)
          }
          else if(event.item_value === "bet_4_and_5"){
            this.arr1 = this.foods.filter((hospital : any) =>  parseFloat(hospital.rating) >= 4.0 && parseFloat(hospital.rating) < 5.0)
          }
          this.arr1 = this.union(this.arr2,this.arr1);
          this.arr2 = this.arr1;
          console.log(this.arr2);
        }
        if(this.arr3.length!=0){
          this.arr3 = this.arr2.filter((item:any)=>this.arr3.includes(item));
        }
        else{
          this.arr3 = this.arr2.filter((item:any)=>this.arr1.includes(item));
        }
        this.new_foods = this.arr3;
      }
      if(this.selectedDistances.length!=0){
        this.arr2 =[];
        for(let event of this.selectedDistances){
          if(event.item_value === "less_than_2"){
            this.arr1 = this.foods.filter((hospital : any) =>  this.geolocationCall(hospital.lat, hospital.lng) < 2)
          }
          else if(event.item_value === "less_than_4"){
            this.arr1 = this.foods.filter((hospital : any) =>  this.geolocationCall(hospital.lat, hospital.lng) < 4)
          }
          else if(event.item_value === "less_than_7"){
            this.arr1 = this.foods.filter((hospital : any) =>  this.geolocationCall(hospital.lat, hospital.lng) < 7)
          }
          else if(event.item_value === "more_than_7"){
            this.arr1 = this.foods.filter((hospital : any) =>  this.geolocationCall(hospital.lat, hospital.lng) > 7)
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
        this.new_foods = this.arr3;
      }
      console.log(this.new_foods)
  }
  displayDetails(hospital:any){
    console.log(hospital._id);
   this.router.navigate(['/map/','F',hospital._id]);
  }
  ngOnInit(): void {
    this.api.getFoods().subscribe((data:any)=>{
      console.log(data);
      this.foods = data.data;
      this.new_foods = this.foods;
    })
    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_value",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 0,
      allowSearchFilter: false
    };
    this.type = [
      {item_id:1,item_text : "Cafe" , item_value : "cafe"},
      {item_id:2,item_text : "Street Foods", item_value : "street"},
      {item_id:3,item_text : "Restaurants" , item_value : "restaurant"},
    ];
    this.selectedType = [];
    this.specialistDropdownSettings = {
      singleSelection: false,
      idField: "item_value",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 0,
      allowSearchFilter: true
    };
    this.food_filter = [
      {item_id:1,item_text : "Sandwiches", item_value: "sandwiches"},
      {item_id:2,item_text : "Beverages", item_value: "beverages"},
      {item_id:3,item_text : "Chineese", item_value: "chineese"},
      {item_id:4,item_text : "Pizza", item_value: "pizza"},
      {item_id:5,item_text : "South - Indian", item_value: "south-indian"},
      {item_id:6,item_text : "North-indian", item_value: "north-indian"},
      {item_id:7,item_text : "Biryani", item_value: "biryani"},
      {item_id:8,item_text : "Desserts", item_value: "desserts"},
      {item_id:9,item_text : "Fast Food", item_value: "fast-food"},
      {item_id:9,item_text : "Hyderabadi", item_value: "hyderabadi"},
      {item_id:9,item_text : "Pani Puri", item_value: "pani-puri"},
      {item_id:9,item_text : "Thali", item_value: "thali"},
    ];
    this.selectedFoodFilter = [];
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
    this.userLocation();
  }

}
