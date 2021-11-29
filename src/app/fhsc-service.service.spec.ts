import { TestBed } from '@angular/core/testing';

import { FhscServiceService } from './fhsc-service.service';

describe('FhscServiceService', () => {
  let service: FhscServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FhscServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
