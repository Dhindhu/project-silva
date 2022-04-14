import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'radial-options',
  templateUrl: './radial-options.component.html',
  styleUrls: ['./radial-options.component.scss'],
})
export class RadialOptionsComponent implements OnInit {
  options = [
    {
      title: 'Admin',
      description: 'No data is anonymized',
      level: 1,
    },
    {
      title: 'Staff',
      description: 'Only location and emails are anonymized',
      level: 2,
    },
    {
      title: 'Developer',
      description:
        'All data is anonymized including names, locations and emails',
      level: 3,
    },
  ];
  @Output()
  active = new EventEmitter<any>();

  choice = this.options[0];

  constructor() {
    this.select(this.options[0]);
  }
  select(choice: any) {
    this.active.emit(choice);
    this.choice = choice;
  }
  ngOnInit() {}
}
