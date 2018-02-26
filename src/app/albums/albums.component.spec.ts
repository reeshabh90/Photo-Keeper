import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumsComponent } from './albums.component';
import { AppMaterialModules } from '../material.module';
import { FormsModule } from '@angular/forms';
import { PhotosComponent } from '../photos/photos.component';
import { DataService } from '../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng2-mock-component';
import { HttpRequestWrapperService } from '../services/http-request-wrapper.service';

describe('AlbumsComponent', () => {
  let component: AlbumsComponent;
  let fixture: ComponentFixture<AlbumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumsComponent, PhotosComponent],
      imports: [AppMaterialModules, FormsModule, HttpClientModule, RouterTestingModule ],
      providers:[DataService, HttpRequestWrapperService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
