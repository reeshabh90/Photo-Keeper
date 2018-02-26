import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { HttpRequestWrapperService } from './http-request-wrapper.service';

@Injectable()
export class DataService {

  constructor(private httpRequestWrapperService: HttpRequestWrapperService) { }

  fetchUsers() {
    const requestData = {
      endpoint: environment.endpoints.GET_USERS.endpoint,
      params: {
      }
    };
    return this.httpRequestWrapperService.fetchData(requestData);
  }

  fetchAlbums(userId) {
    const requestData = {
      endpoint: environment.endpoints.GET_ALBUMS.endpoint,
      params: {
      }
    };
    return this.httpRequestWrapperService.fetchData(requestData).pipe(map(data => data.filter(x => x.userId === +userId)));
  }

  fetchPhotos(albumID) {
    const requestData = {
      endpoint: environment.endpoints.GET_PHOTOS.endpoint,
      params: {
      }
    };
    return this.httpRequestWrapperService.fetchData(requestData).pipe(map(data => data.filter(x => x.albumId === albumID)));
  }

}
