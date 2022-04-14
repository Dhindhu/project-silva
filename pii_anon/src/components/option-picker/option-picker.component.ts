import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'option-picker',
  templateUrl: './option-picker.component.html',
  styleUrls: ['./option-picker.component.scss'],
})
export class OptionPickerComponent implements OnInit {
  choices = ['Apple', 'Oranges', 'Guavas', 'Strawberrys'];

  selected = this.choices[0];
  isOpen = false;
  constructor() {}
  select(choice: any) {
    this.selected = choice;
    this.isOpen = false;
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }
  toggle() {
    this.isOpen = !this.isOpen;
  }
  ngOnInit() {}
}
