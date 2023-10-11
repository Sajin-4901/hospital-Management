import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environmnets/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  post(url: any, data: any) {
    const details = this.http.post('http://localhost:3000/v1/signin', data);
    console.log(details);
    return details;

  }
}
