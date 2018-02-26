import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AlbumsComponent } from './albums.component';
import { AppMaterialModules } from '../material.module';
import { FormsModule } from '@angular/forms';
import { PhotosComponent } from '../photos/photos.component';
import { DataService } from '../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng2-mock-component';
import { HttpRequestWrapperService } from '../services/http-request-wrapper.service';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('AlbumsComponent', () => {
  let component: AlbumsComponent;
  let fixture: ComponentFixture<AlbumsComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let dataService: DataService;
  let button: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumsComponent, MockComponent({ selector: 'app-photos', inputs: ['selectedAlbums', 'albumList'] })],
      imports: [AppMaterialModules, FormsModule, HttpClientModule, RouterTestingModule],
      providers: [DataService, HttpRequestWrapperService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsComponent);
    component = fixture.componentInstance;
    dataService = TestBed.get(DataService);
    spyOn(dataService, 'fetchAlbums').and.callThrough();
    spyOn(component, 'getAlbumByUserId').and.callThrough();
    // query for the title <h2> by CSS element selector
    de = fixture.debugElement.query(By.css('h2'));
    el = de.nativeElement;
    de = fixture.debugElement.query(By.css('button'));
    button = de.nativeElement;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display original title', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(component.title);
  });

  it('should display Show Photos', () => {
    fixture.detectChanges();
    expect(button.textContent).toContain('Show Photos');
  });

  it('should display a different Album title', () => {
    component.title = 'Album Title';
    fixture.detectChanges();
    expect(el.textContent).toContain('Album Title');
  });

  it('should call fetch Album', () => {
    component.ngOnInit();
    expect(dataService.fetchAlbums).toHaveBeenCalled();
  });

  it('should get user details', () => {
    component.ngOnInit();
    expect(component.getAlbumByUserId).toHaveBeenCalled();
  });
});

