import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  setToken(value: any) {
    localStorage.setItem('currentUserToken', JSON.stringify({ 'token': value.token, 'refreshToken': value.refreshToken }));
    return true;
  }

  encrypt(plainText : any){
    let ciphertext;
    ciphertext = CryptoJS.AES.encrypt(plainText.toString(),'c2d0f75d679b71855e3bb4d0e3d90307912f83ab').toString();
    return ciphertext.replace(/\//g, '|');
  }

  decrypt(ciphertext: any) {
    let plaintext;
    let sh = ciphertext.replace(/\|/g, '/')
    const bytes = CryptoJS.AES.decrypt(sh.toString(), 'c2d0f75d679b71855e3bb4d0e3d90307912f83ab');
    plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
  }
}
