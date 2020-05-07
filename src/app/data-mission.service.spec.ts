import { TestBed } from '@angular/core/testing';

import { DataMissionService } from './data-mission.service';

describe('DataMissionService', () => {
  let service: DataMissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataMissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
