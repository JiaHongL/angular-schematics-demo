import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'joe-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Output() buttonClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
