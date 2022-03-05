import { TestBed } from '@angular/core/testing'

import { ApiService } from './api.service'
import { TestingModule } from '../../testing/testing.module'

describe('ApiService', () => {
  let service: ApiService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule]
    })
    service = TestBed.inject(ApiService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
