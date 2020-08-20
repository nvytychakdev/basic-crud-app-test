import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// simple interface definition
// should be moved in separate file in case of growing the app
export interface Trip {
  id: string | number;
  name: string;
  visited: number;
}

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(private http: HttpClient) { }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${environment.endpoint}/trips`);
  }

  getTripById(tripId: string | number): Observable<Trip> {
    return this.http.get<Trip>(`${environment.endpoint}/trips/${tripId}`);
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${environment.endpoint}/trips`, trip);
  }

  removeTrip(tripId: string | number): Observable<Trip> {
    return this.http.delete<Trip>(`${environment.endpoint}/trips/${tripId}`);
  }

}
