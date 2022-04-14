import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  crumbs = [
    {
      label: 'DominoFields',
      route: '',
      href: '',
    },
    {
      label: 'phantom',
      route: '',
      href: '',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
