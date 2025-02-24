import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoadingBehavior = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingBehavior.asObservable();

  showLoader() {
    this.isLoadingBehavior.next(true);
  }

  hideLoader() {
    this.isLoadingBehavior.next(false);
  }
}
