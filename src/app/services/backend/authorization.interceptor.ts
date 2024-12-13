import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BackendService } from './backend.service';

export const xRequestedWithInterceptor: HttpInterceptorFn = (req, next) => {
  const newReq = req.clone({
    headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
  });
  console.log("inside xRequestedWithInterceptor interceptor", req, newReq);
  return next(newReq);
};


export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  const backend = inject(BackendService);
  if(backend.getAuthenticationStatus() && backend.credentialHeader) {
    const finalReq = req.clone({
      headers: req.headers.set("Authorization", backend.credentialHeader["Authorization"])
    });
    console.log("inside authorizationInterceptor interceptor", req, finalReq);
    return next(finalReq);
  }
  return next(req);
};