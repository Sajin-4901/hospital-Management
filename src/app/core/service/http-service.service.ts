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
    const details = this.http.post('http://localhost:3000/v1/' + url, data);
    return details;
  }
  get(url: any) {
    const details = this.http.get('http://localhost:3000/v1/' + url);
    return details;
  }
}
