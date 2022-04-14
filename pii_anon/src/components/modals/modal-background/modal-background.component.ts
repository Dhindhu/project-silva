import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'modal-background',
  templateUrl: './modal-background.component.html',
  styleUrls: ['./modal-background.component.scss'],
})
export class ModalBackgroundComponent implements OnInit {
  @Input()
  close = () => {};

  @Input()
  mtitle = '';
  constructor() {}

  ngOnInit() {}
}
