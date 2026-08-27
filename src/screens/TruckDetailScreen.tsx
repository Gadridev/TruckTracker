import React from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TruckStackParamList } from '../navigation/types';
import { useTrucks } from '../context/TrucksContext';
import { StatusBadge } from '../components/StatusBadge';
import { AppButton } from '../components/AppButton';
import { STATUS_LIST, STATUS_LABELS } from '../constants/status';
import { isOilChangeDue } from '../utils/truck';
import { TruckStatus } from '../types/truck';

type Props = NativeStackScreenProps<TruckStackParamList, 'TruckDetail'>;

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between py-3 border-b border-gray-100">
      <Text className="text-gray-500 text-sm">{label}</Text>
      <Text className="text-gray-900 text-sm font-medium">{value}</Text>
    </View>
  );
}

export function TruckDetailScreen({ route, navigation }: Props) {
  const { truckId } = route.params;
  const { getTruckById, deleteTruck, changeStatus } = useTrucks();
  const truck = getTruckById(truckId);

  if (!truck) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-gray-400">Ce camion n'existe plus.</Text>
      </View>
    );
  }

  function handleDelete() {
    Alert.alert('Supprimer ce camion ?', `Cette action est irréversible pour ${truck!.plateNumber}.`, [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: () => {
          deleteTruck(truck!.id);
          navigation.popToTop();
        },
      },
    ]);
  }

  function handleStatusChange(status: TruckStatus) {
    changeStatus(truck!.id, status);
  }

  return (
    <ScrollView className="flex-1 bg-gray-50 px-4 pt-4">
      <View className="bg-white rounded-2xl p-5 border border-gray-100 mb-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold text-gray-900">{truck.plateNumber}</Text>
          <StatusBadge status={truck.status} />
        </View>

        <InfoRow label="Couleur" value={truck.color} />
        <InfoRow label="Carburant" value={truck.fuelType} />
        <InfoRow label="Kilométrage" value={`${truck.mileage.toLocaleString('fr-FR')} km`} />
        <InfoRow
          label="Prochaine vidange"
          value={`${truck.nextOilChangeMileage.toLocaleString('fr-FR')} km`}
        />

        {isOilChangeDue(truck) && (
          <View className="bg-red-50 rounded-xl p-3 mt-3">
            <Text className="text-red-600 text-sm font-medium">
              Ce camion a atteint le seuil de vidange.
            </Text>
          </View>
        )}
      </View>

      <View className="bg-white rounded-2xl p-5 border border-gray-100 mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-3">Changer le statut</Text>
        <View className="flex-row gap-2">
          {STATUS_LIST.map((status) => (
            <AppButton
              key={status}
              label={STATUS_LABELS[status]}
              variant={status === truck.status ? 'primary' : 'outline'}
              onPress={() => handleStatusChange(status)}
              className="flex-1"
            />
          ))}
        </View>
      </View>

      <View className="gap-3 mb-8">
        <AppButton
          label="Modifier"
          variant="outline"
          onPress={() =>
            navigation.navigate('TruckForm', { status: truck.status, truckId: truck.id })
          }
        />
        <AppButton label="Supprimer" variant="danger" onPress={handleDelete} />
      </View>
    </ScrollView>
  );
}
