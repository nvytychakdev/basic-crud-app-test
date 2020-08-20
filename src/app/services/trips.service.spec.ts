import { environment } from './../../environments/environment';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TripsService, Trip } from './trips.service';
import { HttpClient } from '@angular/common/http';

describe('TripsService', () => {
  let service: TripsService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ TripsService ]
    });
    service = TestBed.inject(TripsService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getTrips should return observable value', () => {
    // make dummy trips
    const mockTrips: Trip[] = [
      { id: 0, name: 'Place 1', visited: 123 },
      { id: 1, name: 'Place 2', visited: 345 },
      { id: 2, name: 'Place 3', visited: 234 }
    ];

    // make request
    service.getTrips().subscribe((trips: Trip[]) => {
        expect(trips.length).toBe(3);
        expect(trips).toBe(mockTrips);
    });

    // force httpclient to response with dummy data on request
    const req = httpMock.expectOne(`${environment.endpoint}/trips`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTrips);

  });

  it('#getTripById should return observable value', () => {
    // make dummy trips
    const mockTrip: Trip = { id: 0, name: 'Place 1', visited: 123 };

    // make request
    service.getTripById(mockTrip.id).subscribe((trip: Trip) => {
      expect(trip).not.toBeNull();
      expect(trip).toBe(mockTrip);
    });

    // force httpclient to response with dummy data on request
    const req = httpMock.expectOne(`${environment.endpoint}/trips/${mockTrip.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTrip);

  });

  it('#addTrip should return observable value', () => {
    // make dummy trips
    const mockTrip: Trip = { id: 2, name: 'Place 152', visited: 65645 };

    // make request
    service.addTrip(mockTrip).subscribe((trip: Trip) => {
      expect(trip).not.toBeNull();
      expect(trip).toBe(mockTrip);
    });

    // force httpclient to response with dummy data on request
    const req = httpMock.expectOne(`${environment.endpoint}/trips`);
    expect(req.request.method).toBe('POST');
    req.flush(mockTrip);

  });

  it('#removeTrip should return observable value', () => {
    // make dummy trips
    const mockTrip: Trip = { id: 2, name: 'Place 152', visited: 65645 };

    // make request
    service.removeTrip(mockTrip.id).subscribe((trip: Trip) => {
      expect(trip).not.toBeNull();
    });

    // force httpclient to response with dummy data on request
    const req = httpMock.expectOne(`${environment.endpoint}/trips/${mockTrip.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});

  });


});
