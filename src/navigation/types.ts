import { TruckStatus } from '../types/truck';

export type TruckStackParamList = {
  TruckList: { status: TruckStatus };
  TruckDetail: { truckId: string };
  TruckForm: { status: TruckStatus; truckId?: string };
};
