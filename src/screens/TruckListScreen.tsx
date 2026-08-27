import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { TruckStackParamList } from '../navigation/types';
import { useTrucks } from '../context/TrucksContext';
import { TruckCard } from '../components/TruckCard';
import { STATUS_LABELS } from '../constants/status';

type Props = NativeStackScreenProps<TruckStackParamList, 'TruckList'>;


export function TruckListScreen({ route, navigation }: Props) {
  const { status } = route.params;
  const { getTrucksByStatus } = useTrucks();
  console.log(navigation,route)
  const trucks = getTrucksByStatus(status);

  return (
    <View className="flex-1 bg-gray-50 px-4 pt-4">
      <FlatList
        data={trucks}
        keyExtractor={(truck) => truck.id}
        renderItem={({ item }) => (
          <TruckCard
            truck={item}
            onPress={() => navigation.navigate('TruckDetail', { truckId: item.id })}
          />
        )}
        contentContainerStyle={{ paddingBottom: 90 }}
        ListEmptyComponent={
          <View className="items-center mt-24">
            <Ionicons name="bus-outline" size={48} color="#D1D5DB" />
            <Text className="text-gray-400 mt-3 text-base">
              Aucun camion {STATUS_LABELS[status].toLowerCase()}
            </Text>
          </View>
        }
      />

      <Pressable
        onPress={() => navigation.navigate('TruckForm', { status })}
        className="absolute bottom-6 right-6 bg-blue-600 w-14 h-14 rounded-full items-center justify-center"
      >
        <Ionicons name="add" size={28} color="white" />
      </Pressable>
    </View>
  );
}
