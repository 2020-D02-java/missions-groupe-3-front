import { TestBed } from '@angular/core/testing';

import { TrtmntNuitService } from './trtmnt-nuit.service';

describe('TrtmntNuitService', () => {
  let service: TrtmntNuitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrtmntNuitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
