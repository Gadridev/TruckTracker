import { Truck } from '../types/truck';

// A truck needs an oil change once its mileage reaches (or passes) the threshold.
export function isOilChangeDue(truck: Truck): boolean {
  return truck.mileage >= truck.nextOilChangeMileage;
}
