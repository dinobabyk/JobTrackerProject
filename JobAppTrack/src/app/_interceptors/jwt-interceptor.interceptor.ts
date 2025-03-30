import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtTok = sessionStorage.getItem('accessToken');
  const newReq = req.clone({
    setHeaders : {
      Authorization : `Bearer ${jwtTok}`
    }
  })
  return next(newReq);
};
