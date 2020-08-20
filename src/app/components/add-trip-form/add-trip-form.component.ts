import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-trip-form',
  templateUrl: './add-trip-form.component.html',
  styleUrls: ['./add-trip-form.component.scss']
})
export class AddTripFormComponent implements OnInit {
  @Output() addEvent = new EventEmitter<string>();

  tripName: string;

  constructor() { }

  ngOnInit(): void { }

  addTrip(name: string): void {
    if (name) {
      this.tripName = '';
      this.addEvent.emit(name);
    }
  }



}
