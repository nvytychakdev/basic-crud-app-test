import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripComponent } from './trip.component';
import { Trip } from 'src/app/services/trips.service';

describe('TripComponent', () => {
  let component: TripComponent;
  let fixture: ComponentFixture<TripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component should have trip data and button', () => {
    const tripMock: Trip = { id: 123, name: 'Test trip', visited: 1234 };
    component.tripId = tripMock.id;
    component.name = tripMock.name;
    component.visited = tripMock.visited;

    // detect template changes
    fixture.detectChanges();

    const componentElement: HTMLElement = fixture.nativeElement;

    const nameInfo = componentElement.querySelector('div.trip div.trip-info div.trip-info-name');
    expect(nameInfo).toBeTruthy();
    expect(nameInfo.innerHTML).toBe(`Name: ${tripMock.name}`);

    const visitedInfo = componentElement.querySelector('div.trip div.trip-info div.trip-info-visited');
    expect(visitedInfo).toBeTruthy();
    expect(visitedInfo.innerHTML).toBe(`Visited: ${tripMock.visited} times`);

    const button = componentElement.querySelector('button.remove-btn');
    expect(button).toBeTruthy();
    expect(button.innerHTML).toBe('Delete');
  });

  it('#removeTrip should raise the event', () => {
    const tripMock: Trip = { id: 123, name: 'Test trip', visited: 1234 };

    component.removeEvent.subscribe((tripId: number|string) => {
      // check emit event value
      expect(tripId).toBe(tripMock.id);
    });

    component.removeTrip(tripMock.id);
  });

});
