import { TestBed } from '@angular/core/testing';

import { CalcularService } from './calcular.service';

describe('CalcularService', () => {
  let service: CalcularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalcularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
