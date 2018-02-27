import { TestBed, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HttpRequestWrapperService } from './http-request-wrapper.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

describe('HttpRequestWrapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpRequestWrapperService,
        { provide: XHRBackend, useClass: MockBackend },
        { provide: environment.API_BASE, useValue: 'http://testPhotos.com' }]
    });
  });

  it('should be created', inject([HttpRequestWrapperService], (service: HttpRequestWrapperService) => {
    expect(service).toBeTruthy();
  }));

  it('should return an Observable<Array<Photos>>',
    inject([HttpRequestWrapperService, XHRBackend], (photoService, mockBackend) => {

      const mockResponse = {
        data: [
          { id: 0, name: 'photo 0' },
          { id: 1, name: 'photo 1' },
          { id: 2, name: 'photo 2' },
          { id: 3, name: 'photo 3' },
        ]
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      const temp = {endpoint: '/testPoint', type: 'GET'};
      photoService.fetchData(temp).subscribe((photos) => {
        expect(photos.length).toBe(4);
        expect(photos[0].name).toEqual('photo 0');
        expect(photos[1].name).toEqual('photo 1');
        expect(photos[2].name).toEqual('photo 2');
        expect(photos[3].name).toEqual('photo 3');
      });

    }));
});
