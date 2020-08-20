import { TripsService, Trip } from './../../services/trips.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private tripsService: TripsService) { }

  trips: Trip[];

  ngOnInit(): void {
    this.getTrips();
  }

  onTripAdded(name: string): void {
    const trip = {
      id: Date.now(),
      name,
      visited: 0
    };

    this.tripsService.addTrip(trip).subscribe((tripAdded: Trip) => {
      console.log('Trip added: ', tripAdded);
      this.trips.push(tripAdded);
    });
  }

  onTripRemoved(tripId: string | number): void {
    this.tripsService.removeTrip(tripId).subscribe(() => {
      console.log(`Trip ${tripId} was removed`);
      const removedIndex = this.trips.findIndex(trip => trip.id === tripId);
      if (removedIndex >= 0) {
        this.trips.splice(removedIndex, 1);
      }
    });
  }

  private getTrips(): void {
    this.tripsService.getTrips().subscribe((trips: Trip[]) => {
      console.log('Trips loaded: ', trips);

      this.trips = trips;
    });
  }



}
