import { FormsModule } from '@angular/forms';
import { AddTripFormComponent } from './../../components/add-trip-form/add-trip-form.component';
import { TripComponent } from './../../components/trip/trip.component';
import { of } from 'rxjs';
import { TripsService, Trip } from './../../services/trips.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { HttpClient } from '@angular/common/http';

describe('MainComponent', () => {
  let component: MainComponent;
  let service: TripsService;
  let fixture: ComponentFixture<MainComponent>;
  const mockTrips: Trip[] = [
    { id: 0, name: 'Some name', visited: 12314 },
    { id: 1, name: 'Some name 2', visited: 342 },
    { id: 3, name: 'Some name 3', visited: 0 }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        TripComponent,
        AddTripFormComponent,
        MainComponent
      ],
      providers: [
        { provide: HttpClient, useValue: null },
        { provide: TripsService, useValue: {
            getTrips: () => of(mockTrips),
            addTrip: (trip: Trip) => of(trip),
            removeTrip: (tripId: number) => of({})
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    service = TestBed.inject(TripsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load trips on init', () => {
    component.ngOnInit();
    expect(component.trips).toBe(mockTrips);
  });

  it('#onTripAdded should add trip to the list', () => {
    const tripName = 'Test added trip';

    component.trips = [ ...mockTrips ];
    expect(component.trips.length).toBe(3);

    component.onTripAdded(tripName);
    expect(component.trips.length).toBe(4);
    expect(component.trips[component.trips.length - 1].name).toBe(tripName);
    expect(component.trips[component.trips.length - 1].visited).toBe(0);
  });


  it('#onTripRemoved should remove trip to the list', () => {
    const tripName = 'Test added trip';

    component.trips = [ ...mockTrips ];
    expect(component.trips.length).toBe(3);

    component.onTripRemoved(mockTrips[0].id);
    expect(component.trips.length).toBe(2);
  });


});
