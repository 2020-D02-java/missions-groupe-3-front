import { TestBed } from '@angular/core/testing';

import { DataNatureService } from './services/data-nature.service';

describe('DataNatureService', () => {
  let service: DataNatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataNatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
