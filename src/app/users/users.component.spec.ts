import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';
import { HttpRequestWrapperService } from '../services/http-request-wrapper.service';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let dataService: DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [RouterModule, HttpClientModule],
      providers: [DataService, HttpRequestWrapperService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    dataService = TestBed.get(DataService);
    spyOn(dataService, 'fetchUsers').and.callThrough();
    de = fixture.debugElement.query(By.css('h2'));
    el = de.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display original title', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(component.title);
  });

  it('should display a different Users title', () => {
    component.title = 'Users Title';
    fixture.detectChanges();
    expect(el.textContent).toContain('Users Title');
  });

  it('should call fetch Users', () => {
    component.ngOnInit();
    expect(dataService.fetchUsers).toHaveBeenCalled();
  });
});
