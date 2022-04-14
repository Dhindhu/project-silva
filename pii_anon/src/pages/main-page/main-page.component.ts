import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  dataRaw = [];
  dataFiltered = [];

  async getUnfilteredView() {}

  async getFilteredView() {}
}
