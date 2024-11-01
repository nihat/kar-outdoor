import { TestBed } from '@angular/core/testing';

import { KarOutDoorFormService } from './kar-out-door-form.service';

describe('KarOutDoorFormService', () => {
  let service: KarOutDoorFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KarOutDoorFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
