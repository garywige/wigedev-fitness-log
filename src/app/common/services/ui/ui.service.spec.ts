import { TestBed } from '@angular/core/testing'
import { TestingModule } from '../../testing/testing.module'

import { UiService } from './ui.service'

describe('UiService', () => {
  let service: UiService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
    })
    service = TestBed.inject(UiService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
