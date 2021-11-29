import { Component, OnInit } from '@angular/core';
import { FhscServiceService } from '../fhsc-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private api : FhscServiceService) { }

  ngOnInit(): void {
    this.api.getHospitals().subscribe((data:any)=>{
      console.log(data);
    })
  }

}
