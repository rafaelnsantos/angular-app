import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';
import {SharedTestingModule} from "../../shared-testing.module";

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
    });
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set loading to true', () => {
    // Act
    service.loading = true;

    // Assert
    expect(service.isLoading()).toBe(true);
  });

  it('should not subtract from loading count when loading is set to false and loading count is 0', () => {
    expect(service['loadingCount']()).toEqual(0);

    // Act
    service.loading = false;

    // Assert
    expect(service['loadingCount']()).toEqual(0);
  });

  it('should set loading to true when loading is set to true twice and then false', () => {
    // Act
    service.loading = true;
    service.loading = true;
    service.loading = false;

    // Assert
    expect(service.isLoading()).toBe(true);
  });

  it('should set loading to true when loading is set to true and false', () => {
    // Act
    service.loading = true;
    service.loading = false;

    // Assert
    expect(service.isLoading()).toBe(false);
  });
});
