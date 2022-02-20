import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class InMemoryAuthService extends AuthService {

  constructor() {
    super()
    console.warn('You\'re using the InMemoryAuthService. Do not use this service in production.')
  }
}
