import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Truck } from '../types/truck';
import { StatusBadge } from './StatusBadge';
import { OilBadge } from './OilBadge';
import { isOilChangeDue } from '../utils/truck';

interface Props {
  truck: Truck;
  onPress: () => void;
}

export function TruckCard({ truck, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-2xl p-4 mb-3 border border-gray-100"
    >
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-lg font-bold text-gray-900">{truck.plateNumber}</Text>
        <StatusBadge status={truck.status} />
      </View>

      <Text className="text-sm text-gray-500 mb-2">
        {truck.color} · {truck.fuelType}
      </Text>

      <View className="flex-row justify-between items-center">
        <Text className="text-sm text-gray-700">{truck.mileage.toLocaleString('fr-FR')} km</Text>
        {isOilChangeDue(truck) && <OilBadge />}
      </View>
    </Pressable>
  );
}
