import React from 'react';
import { View, Text } from 'react-native';
import { TruckStatus } from '../types/truck';
import { STATUS_COLORS, STATUS_LABELS } from '../constants/status';

interface Props {
  status: TruckStatus;
}

export function StatusBadge({ status }: Props) {
  const colors = STATUS_COLORS[status];

  return (
    <View className={`flex-row items-center px-2.5 py-1 rounded-full ${colors.bg}`}>
      <View className={`w-2 h-2 rounded-full mr-1.5 ${colors.dot}`} />
      <Text className={`text-xs font-medium ${colors.text}`}>{STATUS_LABELS[status]}</Text>
    </View>
  );
}
