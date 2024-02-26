import { HostListener, Injectable } from '@angular/core';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { HttpClient, HttpSentEvent } from '@angular/common/http';
import { HttpServiceService } from './http-service.service';
import { BehaviorSubject, Observable, distinctUntilChanged, filter, fromEvent, map, of, startWith } from 'rxjs';
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

// dummy
  // getWindowSize(): Observable<any> {
  //   return fromEvent(window, 'resize').pipe(
  //     map(() => this.getMediaQueryAliases()),
  //     filter(aliases => aliases !== null),
  //     startWith(this.getMediaQueryAliases()),
  //     distinctUntilChanged()
  //   );
  // }
  asObservable(): Observable<any> {
    return new Observable(observer => {
      const handleResize = () => {
        const mediaProperty = this.getMediaQueryAliases();
        if(mediaProperty!==null) observer.next(mediaProperty);
      };
      // Initial emission
      handleResize();
      // Subscribe to window resize events
      const resizeSubscription = fromEvent(window, 'resize').subscribe(() => {
        handleResize();
      });
      // Cleanup subscription on unsubscribe
      return () => {
        resizeSubscription.unsubscribe();
      };
    });
  }
getMediaQueryAliases(): any {
  const screenWidth = window.innerWidth;
  const aliases= [];

  if ( screenWidth>=0 && screenWidth <= 599) {
   aliases.push({mqAliases:'xs'});
  }
  if (screenWidth>=600 && screenWidth <= 959) {
    aliases.push({mqAliases:'sm'});
  }
  if (screenWidth>=960 && screenWidth <= 1279) {
    aliases.push({mqAliases:'md'});
  }
  if (screenWidth>=1280 && screenWidth <= 1919) {
    aliases.push({mqAliases:'lg'});
  }
  if(screenWidth>=1920 && screenWidth<=5000) {
    aliases.push({mqAliases:'xl'});
  }
  if(screenWidth<=599) {
    aliases.push({mqAliases:'lt-sm'});
  }
  if(screenWidth<=959) {
    aliases.push({mqAliases:'lt-md'});
  }
  if(screenWidth<=1279) {
    aliases.push({mqAliases:'lt-lg'});
  }
  if(screenWidth<=1919) {
    aliases.push({mqAliases:'lt-xl'});
  }
  if(screenWidth>=600) {
    aliases.push({mqAliases:'gt-xs'});
  }
  if(screenWidth>=960) {
    aliases.push({mqAliases:'gt-sm'});
  }
  if(screenWidth>=1280) {
    aliases.push({mqAliases:'gt-md'});
  }
  if(screenWidth>=1920) {
    aliases.push({mqAliases:'gt-lg'});
  }
  // console.log('dummy : ',this.dummy);
  // console.log('aliases : ',aliases);
  if(JSON.stringify(this.dummy) !== JSON.stringify(aliases)){
    this.dummy = aliases;
    return aliases;
  }
  return null;
} 

}
