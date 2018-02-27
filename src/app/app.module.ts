import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { UsersComponent } from './users/users.component';
import { DataService } from './services/data.service';
import { AlbumsComponent } from './albums/albums.component';
import { AppMaterialModules } from './material.module';
import { PhotosComponent } from './photos/photos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpRequestWrapperService } from './services/http-request-wrapper.service';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    AlbumsComponent,
    PhotosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppMaterialModules,
    BrowserAnimationsModule
  ],
  providers: [DataService, HttpRequestWrapperService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
