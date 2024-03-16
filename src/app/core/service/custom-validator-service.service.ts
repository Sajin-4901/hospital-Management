import { HostListener, Injectable } from '@angular/core';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { HttpClient, HttpSentEvent } from '@angular/common/http';
import { HttpServiceService } from './http-service.service';
import { BehaviorSubject, Observable, catchError, distinctUntilChanged, filter, fromEvent, map, of, startWith, switchMap } from 'rxjs';
import { AsyncvalidatorService } from './asyncvalidator.service';
@Injectable({
  providedIn: 'root'
})
export class CustomValidatorServiceService {


  // constructor(private httpservice : HttpServiceService){

  // // }
  deviceInfo!: DeviceInfo;
  dummy:any = [];
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
  signupRegistration(data:any){
    return this.httpService.post('signupRegistration',data);
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
  checkEmailAlreadyExists(data:any){
    return this.httpService.post('emailExist',data)
  }
  forgotpasswordEmailCheck(data:any){
    return this.httpService.post('forgotpasswordEmailCheck',data)
  }
  getEmployeeInfo(data:any){
    return this.httpService.post('getEmployeeInfo',data)
  }
  

  // asObservable(): Observable<any> {
  //   return new Observable(observer => {
  //     const handleResize = () => {
  //       const mediaProperty = this.getMediaQueryAliases();
  //       if(mediaProperty!==null) observer.next(mediaProperty);
  //     };
  //     // Initial emission
  //     handleResize();
  //     // Subscribe to window resize events
  //     const resizeSubscription = fromEvent(window, 'resize').subscribe(() => {
  //       handleResize();
  //     });
  //     // Cleanup subscription on unsubscribe
  //     return () => {
  //       resizeSubscription.unsubscribe();
  //     };
  //   });
  // }


}
