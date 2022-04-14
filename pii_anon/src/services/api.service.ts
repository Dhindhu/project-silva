import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  accessLevel = 1;

  email = 'example@gmail.com';

  host = 'localhost:3300';
  constructor(private http: HttpClient) {}

  async requestMembers(level: number) {
    this.http.get(`${this.host}/api/members?access_level=${level}`);
  }
}
