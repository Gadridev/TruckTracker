import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export function OilBadge() {
  return (
    <View className="flex-row items-center bg-red-100 px-2 py-1 rounded-full">
      <Ionicons name="warning" size={12} color="#DC2626" />
      <Text className="text-xs font-semibold text-red-600 ml-1">Vidange due</Text>
    </View>
  );
}
