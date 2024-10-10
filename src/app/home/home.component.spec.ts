import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render image', () => {
    const image = fixture.debugElement.query(By.css('img.rounded-3xl'));
    expect(image).toBeTruthy();
  });

  it('should navigate to unit list', () => {
    const link = fixture.debugElement.query(
      By.css('div.rounded-3xl > a:nth-child(1)'),
    );
    expect(link.nativeElement.getAttribute('href')).toBe('/unit-list');
  });

  it('should set title', () => {
    const title = component.titleService.getTitle();
    expect(title).toBe('Age of Empires');
  });
});
