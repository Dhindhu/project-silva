import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  accessLevel = 1;

  email = 'example@gmail.com';

  host = 'localhost:3300';
  constructor(private http: HttpClient) {}

  async requestMembers(level: number) {
    await axios({
      method: 'post',
      url: `${this.host}/api/members`,
      data: {
        access_level: level,
      },
    }).then((res) => {
      console.log(res);
    });
  }
}
