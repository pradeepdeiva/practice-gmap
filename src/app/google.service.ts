import { Injectable } from '@angular/core';
import { travelDeatils } from './model';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor() { }

  

  travelDetails: travelDeatils[] = [];
  // {source: '1', destination: 'Hydrogen', distance: '1.0079', duration: 'H',orginActualAddress: '123', destinationActualAddress: '123'},
  // {source: '2', destination: 'Helium', distance: '4.0026', duration: 'He',orginActualAddress: '123', destinationActualAddress: '123'},
  // {source: '3', destination: 'Lithium', distance: '6.941', duration: 'Li',orginActualAddress: '123', destinationActualAddress: '123'},
  // {source: '4', destination: 'Beryllium', distance: '9.0122', duration: 'Be',orginActualAddress: '123', destinationActualAddress: '123'},
  // {source: '5', destination: 'Boron', distance: '10.811', duration: 'B',orginActualAddress: '123', destinationActualAddress: '123'},
  // {source: '6', destination: 'Carbon', distance: '12.0107', duration: 'C',orginActualAddress: '123', destinationActualAddress: '123'},
  // {source: '7', destination: 'Nitrogen', distance: '14.0067', duration: 'N',orginActualAddress: '123', destinationActualAddress: '123'},
  // {source: '8', destination: 'Oxygen', distance: '15.9994', duration: 'O',orginActualAddress: '123', destinationActualAddress: '123'},
  // {source: '9', destination: 'Fluorine', distance: '8.99841', duration: 'F',orginActualAddress: '123', destinationActualAddress: '123'},
  // {source: '10', destination: 'Neon', distance: '0.1797', duration: 'Ne',orginActualAddress: '123', destinationActualAddress: '123'}


  setTraveDetails(details: travelDeatils){
    this.travelDetails.push(details);
  }

  getTravelDetails() :Observable<travelDeatils[]>{

    return  of(this.travelDetails);
  }

  get getTravel(){
    console.log(this.travelDetails)
    return this.travelDetails;
  }


}
