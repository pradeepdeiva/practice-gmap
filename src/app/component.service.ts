import { Injectable } from '@angular/core';
import { travelDeatils } from './model';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, catchError, finalize, of } from 'rxjs';
import { GoogleService } from './google.service';

@Injectable({
  providedIn: 'root'
})
export class ComponentService implements DataSource<travelDeatils> {

  private lessonsSubject = new BehaviorSubject<travelDeatils[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

    constructor(private service: GoogleService ) {}

    connect(collectionViewer: CollectionViewer): Observable<travelDeatils[]> {
      return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
      this.lessonsSubject.complete();
      this.loadingSubject.complete();
    }
  
    loadLessons() {
                    
                  this.loadingSubject.next(true);

                  this.service.getTravelDetails().pipe(
                    catchError(() => of([])),
                    finalize(() => this.loadingSubject.next(false))
                  )
                  .subscribe((details: travelDeatils[]) =>{
                    console.log(of(this.lessonsSubject))
                    this.lessonsSubject.next(details)
                  });
    }  


}
