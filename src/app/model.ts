export interface latLngAdd {
    lng: number
    lat: number
    address: string
}

export interface travelDeatils{
    source: string,
    destination: string,
    distance: string,
    duration: string,
    orginActualAddress: string,
    destinationActualAddress: string
    
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
