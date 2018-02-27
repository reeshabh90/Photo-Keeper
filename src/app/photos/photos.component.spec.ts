import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PhotosComponent } from './photos.component';
import { AppMaterialModules } from '../material.module';
import { DataService } from '../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpRequestWrapperService } from '../services/http-request-wrapper.service';
import { DebugElement, SimpleChange } from '@angular/core';

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let dataService: DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhotosComponent],
      imports: [AppMaterialModules, HttpClientModule],
      providers: [DataService, HttpRequestWrapperService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    dataService = TestBed.get(DataService);
    spyOn(dataService, 'fetchPhotos').and.callThrough();
    spyOn(component, 'unSubscription').and.callThrough();
    spyOn(component, 'apiRequest').and.callThrough();
    component.counter = 1;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('h3'));
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display original title', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(component.title);
  });

  it('should display Header', () => {
    component.header = 'Test Header';
    fixture.detectChanges();
    expect(el.textContent).toContain(component.header);
  });

  it('should display a different photo title', () => {
    component.title = 'Photos Title';
    fixture.detectChanges();
    expect(el.textContent).toContain('Photos Title');
  });

  it('should call Unsubscription after On Destroy', () => {
    component.ngOnDestroy();
    expect(component.unSubscription).toHaveBeenCalled();
  });

  it('should call Unsubscription after On Change', () => {
    component.ngOnChanges({
      'selectedAlbums': new SimpleChange({}, {}, true),
    });
    expect(component.unSubscription).toHaveBeenCalled();
  });


});
