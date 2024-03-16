import { Injectable } from '@angular/core';
import { CustomValidatorServiceService } from './custom-validator-service.service';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, map, of, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsyncvalidatorService {

  constructor() { }
   static emailAlreadyExists(customValidatorService : CustomValidatorServiceService) : AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> |  Promise<ValidationErrors | null> => {
            return timer(500).pipe(switchMap(() => {
                return customValidatorService.checkEmailAlreadyExists({email :control.value}).pipe(map((response: any) => {
                  if (response && response.alreadyExist) {
                    return { 'alreadyExist': true };
                  }
                  else {
                    return null;
                  }
                }));
              // return of(null);
            }));
          };
    };

    static forgotpasswordEmailCheck(customValidatorService : CustomValidatorServiceService) : AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors | null> |  Promise<ValidationErrors | null> => {
              return timer(500).pipe(switchMap(() => {
                  return customValidatorService.forgotpasswordEmailCheck({email :control.value}).pipe(map((response: any) => {
                    if (response && response.emailNotExist) {
                      return { 'emailNotExist': true };
                    }
                    else {
                      return null;
                    }
                  }));
                // return of(null);
              }));
            };
      };
  }
