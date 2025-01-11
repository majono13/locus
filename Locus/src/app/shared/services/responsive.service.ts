import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  readonly screenWidth$ = new BehaviorSubject<number>(1200);
  readonly isMobile$ = new BehaviorSubject<boolean>(false);

constructor() { }

}
