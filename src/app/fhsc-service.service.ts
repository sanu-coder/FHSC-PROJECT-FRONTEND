import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FhscServiceService {
  httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'my-auth-token'
    })
  };
  constructor(private http : HttpClient) { 

  }
  register(user :any){
    return this.http.post('http://localhost:3000/api/v1/register',
    { "data" : user},
    this.httpOptions);
  }
  login(user:any){
    console.log(user);
    return this.http.post('http://localhost:3000/api/v1/login',
    { "data" : user},
    this.httpOptions);
  }
  getHospitals(){
    return this.http.get('http://localhost:3000/api/v1/hospitals');
  }
  getFoods(){
    return this.http.get('http://localhost:3000/api/v1/cafes');
  }
  getShoppings(){
    return this.http.get('http://localhost:3000/api/v1/shopping');
  }
}
