import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ApiService } from 'src/services/api.service';
// import searchhash from 'searchhash'
declare var require: any;
const searchhash = require('searchhash');
@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
})
export class DatatableComponent implements OnInit, OnChanges {
  @Input()
  data: any[] = [
    {
      id: 'efb44fb6-8020-4332-967f-b60c0045b364',
      name: 'Abel Snyder',
      phone: '1-737-576-9242',
      email: 'vel@hotmail.org',
      address: '627-7796 Congue, Av.',
      postalZip: '528032',
      region: 'South Island',
      country: 'Peru',
      notes: 'et risus. Quisque libero lacus, varius et, euismod et, commodo',
      company: 'Vel LLC',
      credit_card_cvv: '658',
      credit_card_number: '4716 356 19 5496',
      bank_account_iban: 'AT882393271831479782',
      password: 'AT882393271831479782',
    },
  ];
  @Input()
  level = 1;
  filtered: any = [];
  keys: any = [];
  constructor(private apiService: ApiService) {
    this.filter('');
    this.getColumnLabels();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.filter(changes['query'].currentValue);
  }
  @Input()
  query = '';
  filter(query: string) {
    console.log(query);
    if (query == '' || query == null) {
      this.filtered = this.data;
      return;
    }
    let found: any[] = searchhash.forValue(this.data, query);
    if (found.length === 0) {
      this.filtered = [];
      return;
    }
    this.filtered = found.map((val) => {
      return this.data[val.container];
    });
  }
  getColumnLabels() {
    this.keys = Object.keys(this.data[0]);
  }

  getCellValue(label: string, row: any) {
    return row[label];
  }
  async ngOnInit() {
    this.data = await this.apiService.requestMembers(this.level);
    this.getColumnLabels();
    this.filtered = this.data;
  }
}
