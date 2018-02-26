import { TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DataService } from './data.service';
import { HttpRequestWrapperService } from './http-request-wrapper.service';
import { HttpClientModule } from '@angular/common/http';

describe('DataService', () => {
  let httpRequestWrapperService: HttpRequestWrapperService;
  let dataService: DataService;
  const mockUserId = 1;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [DataService, HttpRequestWrapperService]
    });
  });

  beforeEach(() => {
    httpRequestWrapperService = TestBed.get(HttpRequestWrapperService);
    dataService = TestBed.get(DataService);
    spyOn(httpRequestWrapperService, 'fetchData').and.callThrough();
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

  it('should call fetch Data on Fetching albums call', () => {
    dataService.fetchAlbums(mockUserId);
    expect(httpRequestWrapperService.fetchData).toHaveBeenCalled();
  });

  it('should call fetch Data on Fetching Photos call', () => {
    dataService.fetchPhotos(mockUserId);
    expect(httpRequestWrapperService.fetchData).toHaveBeenCalled();
  });

  it('should call fetch Data on Fetching users call', () => {
    dataService.fetchUsers();
    expect(httpRequestWrapperService.fetchData).toHaveBeenCalled();
  });
});
