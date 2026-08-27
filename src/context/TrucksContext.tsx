import React, { createContext, useCallback, useContext, useState, ReactNode } from 'react';
import { Truck, TruckInput, TruckStatus } from '../types/truck';
import { initialTrucks } from '../data/data';

interface TrucksContextValue {
  trucks: Truck[];
  getTruckById: (id: string) => Truck | undefined;
  getTrucksByStatus: (status: TruckStatus) => Truck[];
  addTruck: (truck: TruckInput) => void;
  updateTruck: (id: string, data: TruckInput) => void;
  deleteTruck: (id: string) => void;
  changeStatus: (id: string, status: TruckStatus) => void;
}

const TrucksContext = createContext<TrucksContextValue | undefined>(undefined);

export function TrucksProvider({ children }: { children: ReactNode }) {
  const [trucks, setTrucks] = useState<Truck[]>(initialTrucks);

  const getTruckById = useCallback(
    (id: string) => trucks.find((truck) => truck.id === id),
    [trucks]
  );

  const getTrucksByStatus = useCallback(
    (status: TruckStatus) => trucks.filter((truck) => truck.status === status),
    [trucks]
  );

  const addTruck = useCallback((truck: TruckInput) => {
    const newTruck: Truck = { ...truck, id: Date.now().toString() };
    setTrucks((prev) => [...prev, newTruck]);
  }, []);

  const updateTruck = useCallback((id: string, data: TruckInput) => {
    setTrucks((prev) => prev.map((truck) => (truck.id === id ? { ...data, id } : truck)));
  }, []);

  const deleteTruck = useCallback((id: string) => {
    setTrucks((prev) => prev.filter((truck) => truck.id !== id));
  }, []);

  const changeStatus = useCallback((id: string, status: TruckStatus) => {
    setTrucks((prev) => prev.map((truck) => (truck.id === id ? { ...truck, status } : truck)));
  }, []);

  const value: TrucksContextValue = {
    trucks,
    getTruckById,
    getTrucksByStatus,
    addTruck,
    updateTruck,
    deleteTruck,
    changeStatus,
  };

  return <TrucksContext.Provider value={value}>{children}</TrucksContext.Provider>;
}

export function useTrucks(): TrucksContextValue {
  const context = useContext(TrucksContext);
  if (!context) {
    throw new Error('useTrucks must be used inside a <TrucksProvider>');
  }
  return context;
}
