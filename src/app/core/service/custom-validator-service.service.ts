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
  deviceInfo!: DeviceInfo;
  constructor(
    private deviceDetectorService: DeviceDetectorService,
    private http: HttpClient,
    private httpService: HttpServiceService
  ) { }
  // ngOnInit(){
  //  }

  getDeviceInfo() {
    this.deviceInfo = this.deviceDetectorService.getDeviceInfo();
    return this.deviceInfo;
  }
  getIp() {
    return this.http.get("https://api64.ipify.org/?format=json");
  }
  signin(data: any) {
    return this.httpService.post('signin', data);
  }
  getCountry() {
    return this.httpService.get('getCountry');
  }
  getState(data: any) {
    console.log('data:', data);
    return this.httpService.post('getState', data);
  }
  onSignUp(data: any) {
    console.log('data :', data);
    console.log('s1');
    return this.httpService.post('signup', data);
  }
}
