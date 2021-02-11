import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

  urlNotToUse: Array<string>;


  constructor(private auth: AuthService) {
    this.urlNotToUse = [
      '/api/login'
    ];
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.auth.authToken != null && this.isValidRequestForInterceptor(request.url)) {
      const authReq = request.clone({
        setHeaders: {
          authorization: this.auth.authToken
        }
      });
      return next.handle(authReq);
    }
    return next.handle(request);
  }

  private isValidRequestForInterceptor(requestUrl: string): boolean {
    let positionIndicator: string = '/api/';
    let position = requestUrl.indexOf(positionIndicator);
    if (position > 0) {
      let destination: string = requestUrl.substr(position + positionIndicator.length);
      for (let address of this.urlNotToUse) {
        if (new RegExp(address).test(destination)) {
          return false;
        }
      }
    }
    return true;
  }
}
