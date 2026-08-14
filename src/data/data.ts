import { Truck } from '../types/truck';

export const initialTrucks: Truck[] = [
  {
    id: '1',
    plateNumber: '12345-A-6',
    color: 'Blanc',
    fuelType: 'Diesel',
    mileage: 85000,
    status: 'active',
    nextOilChangeMileage: 90000,
  },
  {
    id: '2',
    plateNumber: '67890-B-1',
    color: 'Bleu',
    fuelType: 'Diesel',
    mileage: 120500,
    status: 'active',
    nextOilChangeMileage: 120000,
  },
  {
    id: '3',
    plateNumber: '11223-C-4',
    color: 'Rouge',
    fuelType: 'Essence',
    mileage: 45000,
    status: 'stopped',
    nextOilChangeMileage: 60000,
  },
  {
    id: '4',
    plateNumber: '44556-D-7',
    color: 'Gris',
    fuelType: 'Diesel',
    mileage: 98000,
    status: 'maintenance',
    nextOilChangeMileage: 95000,
  },
];
