import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTripFormComponent } from './add-trip-form.component';

describe('AddTripFormComponent', () => {
  let component: AddTripFormComponent;
  let fixture: ComponentFixture<AddTripFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ AddTripFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTripFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component should have input and button', () => {
    const componentElement: HTMLElement = fixture.nativeElement;

    const input = componentElement.querySelector('input.name-input');
    expect(input).toBeTruthy();
    expect(input.getAttribute('placeholder')).toBe('Trip name');

    const button = componentElement.querySelector('button.add-btn');
    expect(button).toBeTruthy();
    expect(button.innerHTML).toBe('Add Trip');
  });


  it('#addTrip should raise the event', () => {
    const mockTripName = 'Some test name';
    component.tripName = mockTripName;

    component.addEvent.subscribe((newTripName: string) => {
      // check emit event value
      expect(newTripName).toBe(mockTripName);
    });

    component.addTrip(component.tripName);
    // check is input cleared after tripAdded
    expect(component.tripName).toBe('');
  });


});
