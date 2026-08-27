import { TruckStatus } from '../types/truck';

export const STATUS_LIST: TruckStatus[] = ['active', 'stopped', 'maintenance'];

export const STATUS_LABELS: Record<TruckStatus, string> = {
  active: 'En service',
  stopped: "À l'arrêt",
  maintenance: 'En maintenance',
};

export const STATUS_COLORS: Record<TruckStatus, { bg: string; text: string; dot: string }> = {
  active: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  stopped: { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
  maintenance: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
};

export const STATUS_TAB_NAME: Record<TruckStatus, string> = {
  active: 'EnService',
  stopped: 'ALArret',
  maintenance: 'EnMaintenance',
};
