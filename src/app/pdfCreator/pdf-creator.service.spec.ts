import { TestBed, inject } from '@angular/core/testing';

import { PdfCreatorService } from './pdf-creator.service';

describe('PdfCreatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PdfCreatorService]
    });
  });

  it('should be created', inject([PdfCreatorService], (service: PdfCreatorService) => {
    expect(service).toBeTruthy();
  }));
});
