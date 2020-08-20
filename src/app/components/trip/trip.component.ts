import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  @Input() tripId: string | number;
  @Input() name: string;
  @Input() visited: number;
  @Output() removeEvent = new EventEmitter<string|number>();

  constructor() { }

  ngOnInit(): void { }

  removeTrip(tripId: string|number): void {
    this.removeEvent.emit(tripId);
  }

}
