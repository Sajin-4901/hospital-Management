import { Injectable } from '@angular/core';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { HttpClient, HttpSentEvent } from '@angular/common/http';
import { HttpServiceService } from './http-service.service';
@Injectable({
  providedIn: 'root'
})
export class CustomValidatorServiceService {


  // constructor(private httpservice : HttpServiceService){

  // // }
  deviceInfo!:DeviceInfo ;
  constructor(
    private deviceDetectorService: DeviceDetectorService,
    private http : HttpClient,
    private httpService: HttpServiceService
    ) {}
  // ngOnInit(){
  //  }

  getDeviceInfo(){
    this.deviceInfo = this.deviceDetectorService.getDeviceInfo();
    return this.deviceInfo;
  }
  getIp(){
    return this.http.get("https://api64.ipify.org/?format=json");
  }
  signin(data:any){
    return this.httpService.post('signin',data);
  }
}
