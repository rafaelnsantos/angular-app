import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoadingService } from "../../services/loading/loading.service";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { loadingInterceptor } from "./loading.interceptor";
import {SharedTestingModule} from "../../shared-testing.module";

describe('loadingInterceptor', () => {
  let httpMock: HttpTestingController;
  let loadingService: LoadingService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [
        LoadingService,
        provideHttpClient(withInterceptors([loadingInterceptor])),
        provideHttpClientTesting(),
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    loadingService = TestBed.inject(LoadingService);
    http = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify(); // Make sure that there are no outstanding requests.
  });

  it('should set loading to true when request is made and false when its done', () => {
    // Arrange
    const spy = spyOnProperty(loadingService, 'loading', 'set')
    http.get('/api').subscribe();
    expect(spy).toHaveBeenCalledWith(true);

    // Simulate a network response.
    httpMock.expectOne('/api').flush({})

    // Assert
    expect(spy).toHaveBeenCalledWith(false);
  });
});
