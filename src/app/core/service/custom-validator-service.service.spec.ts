import { TestBed } from '@angular/core/testing';

import { CustomValidatorServiceService } from './custom-validator-service.service';

describe('CustomValidatorServiceService', () => {
  let service: CustomValidatorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomValidatorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
