import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonGroupComponent } from './button-group.component';
import { ButtonGroupOption } from './models/button-group-option';

describe('ButtonGroupComponent', () => {
  let component: ButtonGroupComponent;
  let fixture: ComponentFixture<ButtonGroupComponent>;
  let options: ButtonGroupOption<number>[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonGroupComponent],
    }).compileComponents();

    options = [
      {
        value: 0,
        displayName: 'First button',
      },
      {
        value: 1,
        displayName: 'Second button',
      },
      {
        value: 2,
        displayName: 'Third button',
      },
    ];
    fixture = TestBed.createComponent(ButtonGroupComponent);
    fixture.componentRef.setInput('options', options);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create buttons', () => {
    expect(component.options.length).toBe(options.length);
  });

  it('should set button as selected', () => {
    fixture.componentRef.setInput('selectedOptionIndex', 2);
    fixture.detectChanges();
    let button2 = document.getElementById('btn-' + 2);
    expect(button2!.className.includes('ring-2')).toBeTruthy();

    fixture.componentRef.setInput('selectedOptionIndex', 1);
    fixture.detectChanges();

    const button1 = document.getElementById('btn-' + 1);
    button2 = document.getElementById('btn-' + 2);
    expect(button1!.className.includes('ring-2')).toBeTruthy();
    expect(button2!.className.includes('ring-2')).toBeFalsy();
  });

  it('should set index on click', () => {
    const button = document.getElementById('btn-' + 2);
    button!.click();
    expect(component.selectedOptionIndex).toBe(2);
  });

  it('should emit on selected change', () => {
    const button = document.getElementById('btn-' + 1);

    component.selectedChanged.subscribe((selectedOption) => {
      expect(selectedOption).toBe(options[1]);
    });

    button!.click();
    fixture.detectChanges();
  });
});
