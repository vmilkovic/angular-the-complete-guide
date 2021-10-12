import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.css']
})
export class EventComponent implements OnInit {
  @Input() number: number;

  constructor() { }

  ngOnInit(): void {
  }

}
