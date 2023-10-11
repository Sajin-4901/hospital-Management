import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  setToken(value: any) {
    localStorage.setItem('currentUserToken', JSON.stringify({ 'token': value.token, 'refreshToken': value.refreshToken }));
    return true;
  }
}
