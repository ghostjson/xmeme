import { TestBed } from '@angular/core/testing';

import { MemeService } from './meme.service';

describe('MemeService', () => {
  let service: MemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
