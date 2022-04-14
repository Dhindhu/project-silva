import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  email = '';

  accessLevelText() {
    if (this.apiService.accessLevel == 1) {
      return 'Administrator';
    } else if (this.apiService.accessLevel == 2) {
      return 'Staff';
    } else {
      return 'Developer';
    }
  }
  ngOnInit() {}

  dataRaw = [];
  dataFiltered = [];

  filterQuery = '';
  async getUnfilteredView() {}

  async getFilteredView() {}
}
