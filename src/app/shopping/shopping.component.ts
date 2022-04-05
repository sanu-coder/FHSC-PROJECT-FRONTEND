import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FhscServiceService } from '../fhsc-service.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  type:any;
  selectedType:any;
  dropdownSettings:any;
  specialistDropdownSettings:any;
  shopping_filter:any;
  selectedShoppingFilter:any;
  distances:any;
  new_shoppings:any;
  selectedRatings:any;
  selectedDistances:any;
  ratings : any;
  shoppings:any;
  arr3:any;
  arr2:any;
  arr1:any;
  latUser:any;
  lngUser:any;
  // shoppings:any;
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
      this.new_shoppings = this.shoppings;
      // Ownership
      if(this.selectedType.length!=0){
        this.arr2 = [];
        for(let event of this.selectedType){
          this.arr1 = this.shoppings.filter((shopping:any)=> shopping.type === event.item_value);
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
        this.new_shoppings = this.arr3;
      }
     
      console.log(this.arr3);
      // Features
      if(this.selectedShoppingFilter.length!=0){
        this.arr2 =[];
        for(let event of this.selectedShoppingFilter){
          this.arr1 = this.shoppings.filter((shopping:any)=> shopping.features.includes(event.item_value));
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
        this.new_shoppings = this.arr3;
      }
      
      // ratings
      if(this.selectedRatings.length!=0){
        this.arr2 =[];
        for(let event of this.selectedRatings){
        
          if(event.item_value === "less_than_2"){
            this.arr1 = this.new_shoppings.filter((shopping : any) => parseFloat(shopping.rating)  < 2.0);
          }
          else if(event.item_value === "more_than_2"){
            this.arr1 = this.new_shoppings.filter((shopping : any) => parseFloat(shopping.rating) > 2.0)
          }
          else if(event.item_value === "more_than_3"){
            this.arr1 = this.new_shoppings.filter((shopping : any) => parseFloat(shopping.rating) > 3.0)
          }
          else if(event.item_value === "more_than_4"){
            this.arr1 = this.new_shoppings.filter((shopping : any) => parseFloat(shopping.rating) > 4.0);
          }
          else if(event.item_value === "bet_1_and_2"){
            this.arr1 = this.new_shoppings.filter((shopping : any) => parseFloat(shopping.rating) >= 1.0 &&  parseFloat(shopping.rating) < 2.0);
          }
          else if(event.item_value === "bet_2_and_3"){
            this.arr1 = this.new_shoppings.filter((shopping : any) => parseFloat(shopping.rating) >= 2.0 && parseFloat(shopping.rating) < 3.0)
          }
          else if(event.item_value === "bet_3_and_4"){
            this.arr1 = this.new_shoppings.filter((shopping : any) =>  parseFloat(shopping.rating) >= 3.0 && parseFloat(shopping.rating) < 4.0)
          }
          else if(event.item_value === "bet_4_and_5"){
            this.arr1 = this.new_shoppings.filter((shopping : any) =>  parseFloat(shopping.rating) >= 4.0 && parseFloat(shopping.rating) < 5.0)
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
        this.new_shoppings = this.arr3;
      }
      
      // distance 
      if(this.selectedDistances.length!=0){
        this.arr2 =[];
        for(let event of this.selectedDistances){
          if(event.item_value === "less_than_2"){
            this.arr1 = this.new_shoppings.filter((shopping : any) =>  this.geolocationCall(shopping.lat, shopping.lng) < 2)
          }
          else if(event.item_value === "less_than_4"){
            this.arr1 = this.new_shoppings.filter((shopping : any) =>  this.geolocationCall(shopping.lat, shopping.lng) < 4)
          }
          else if(event.item_value === "less_than_7"){
            this.arr1 = this.new_shoppings.filter((shopping : any) =>  this.geolocationCall(shopping.lat, shopping.lng) < 7)
          }
          else if(event.item_value === "more_than_7"){
            this.arr1 = this.new_shoppings.filter((shopping : any) =>  this.geolocationCall(shopping.lat, shopping.lng) > 7)
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
        this.new_shoppings = this.arr3;
      }
  }
  displayDetails(shopping:any){
    console.log(shopping._id);
   this.router.navigate(['/map/','S',shopping._id]);
  }
  ngOnInit(): void {
    this.api.getShoppings().subscribe((data:any)=>{
      console.log(data);
      this.shoppings = data.data;
      this.new_shoppings = this.shoppings;
    })
    this.selectedType = [];
    this.selectedRatings = [];
    this.selectedDistances = [];
    this.selectedShoppingFilter = [];
    this.type = [
      {item_id:1,item_text : "Supermarket" , item_value : "supermarkets"},
      {item_id:2,item_text : "Mall", item_value : "mall"},
      {item_id:3,item_text : "Shop" , item_value : "shop"},
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
    ];
    this.shopping_filter = [
      {item_id:1,item_text : "Grocery", item_value: "grocery"},
      {item_id:2,item_text : "Cosmetics", item_value: "cosmetics"},
      {item_id:3,item_text : "Clothes", item_value: "clothes"},
      {item_id:4,item_text : "Footwears", item_value: "footwears"},
      {item_id:5,item_text : "Kitchen", item_value: "kitchen"},
      {item_id:6,item_text : "Vegetables", item_value: "vegetables"},
      {item_id:7,item_text : "Fruits", item_value: "fruits"},
      {item_id:8,item_text : "Sweets", item_value: "sweets"},
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_value",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 0,
      allowSearchFilter: false
    };
    this.specialistDropdownSettings = {
      singleSelection: false,
      idField: "item_value",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 0,
      allowSearchFilter: true
    };
  }

}
