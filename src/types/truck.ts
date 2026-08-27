// The three possible statuses for a truck.
export type TruckStatus = 'active' | 'stopped' | 'maintenance';

// A truck as stored in the app's state.
export interface Truck {
  id: string;
  plateNumber: string;
  color: string;
  fuelType: string;
  mileage: number;
  status: TruckStatus;
  nextOilChangeMileage: number;
}

// Same shape as Truck, but without the id — used when creating or editing.
export type TruckInput = Omit<Truck, 'id'>;
