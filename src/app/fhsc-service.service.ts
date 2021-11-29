import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FhscServiceService {

  constructor(private http : HttpClient) { 

  }

  getHospitals(){
    return this.http.get('http://localhost:3000/api/v1/hospitals');
  }
}
