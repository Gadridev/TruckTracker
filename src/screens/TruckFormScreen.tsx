import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TruckStackParamList } from '../navigation/types';
import { useTrucks } from '../context/TrucksContext';
import { FormInput } from '../components/FormInput';
import { AppButton } from '../components/AppButton';
import { STATUS_LIST, STATUS_LABELS, STATUS_TAB_NAME } from '../constants/status';
import { TruckStatus } from '../types/truck';

type Props = NativeStackScreenProps<TruckStackParamList, 'TruckForm'>;

interface FormErrors {
  plateNumber?: string;
  color?: string;
  fuelType?: string;
  mileage?: string;
  nextOilChangeMileage?: string;
}

export function TruckFormScreen({ route, navigation }: Props) {
  const { status: tabStatus, truckId } = route.params;
  const { getTruckById, addTruck, updateTruck } = useTrucks();
  const existingTruck = truckId ? getTruckById(truckId) : undefined;
  const isEditing = existingTruck !== undefined;

  const [plateNumber, setPlateNumber] = useState(existingTruck?.plateNumber ?? '');
  const [color, setColor] = useState(existingTruck?.color ?? '');
  const [fuelType, setFuelType] = useState(existingTruck?.fuelType ?? '');
  const [mileage, setMileage] = useState(existingTruck ? String(existingTruck.mileage) : '');
  const [nextOilChangeMileage, setNextOilChangeMileage] = useState(
    existingTruck ? String(existingTruck.nextOilChangeMileage) : ''
  );
  const [selectedStatus, setSelectedStatus] = useState<TruckStatus>(
    existingTruck?.status ?? tabStatus
  );
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const nextErrors: FormErrors = {};

    if (!plateNumber.trim()) nextErrors.plateNumber = "L'immatriculation est obligatoire";
    if (!color.trim()) nextErrors.color = 'La couleur est obligatoire';
    if (!fuelType.trim()) nextErrors.fuelType = 'Le type de carburant est obligatoire';

    const mileageValue = Number(mileage);
    if (!mileage.trim() || Number.isNaN(mileageValue) || mileageValue < 0) {
      nextErrors.mileage = 'Le kilométrage doit être un nombre valide';
    }

    const oilChangeValue = Number(nextOilChangeMileage);
    if (!nextOilChangeMileage.trim() || Number.isNaN(oilChangeValue) || oilChangeValue < 0) {
      nextErrors.nextOilChangeMileage = 'Ce champ doit être un nombre valide';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;

    const truckData = {
      plateNumber: plateNumber.trim(),
      color: color.trim(),
      fuelType: fuelType.trim(),
      mileage: Number(mileage),
      nextOilChangeMileage: Number(nextOilChangeMileage),
      status: selectedStatus,
    };

    if (isEditing && existingTruck) {
      updateTruck(existingTruck.id, truckData);
      navigation.navigate('TruckDetail', { truckId: existingTruck.id });
      return;
    }

    addTruck(truckData);
    navigation.popToTop();

    if (selectedStatus !== tabStatus) {
      navigation.getParent()?.navigate(STATUS_TAB_NAME[selectedStatus]);
    }
  }

  return (
    <ScrollView className="flex-1 bg-gray-50 px-4 pt-4">
      <FormInput
        label="Immatriculation"
        value={plateNumber}
        onChangeText={setPlateNumber}
        placeholder="Ex: 12345-A-6"
        error={errors.plateNumber}
      />
      <FormInput
        label="Couleur"
        value={color}
        onChangeText={setColor}
        placeholder="Ex: Blanc"
        error={errors.color}
      />
      <FormInput
        label="Type de carburant"
        value={fuelType}
        onChangeText={setFuelType}
        placeholder="Ex: Diesel"
        error={errors.fuelType}
      />
      <FormInput
        label="Kilométrage"
        value={mileage}
        onChangeText={setMileage}
        placeholder="Ex: 85000"
        keyboardType="numeric"
        error={errors.mileage}
      />
      <FormInput
        label="Prochaine vidange (km)"
        value={nextOilChangeMileage}
        onChangeText={setNextOilChangeMileage}
        placeholder="Ex: 90000"
        keyboardType="numeric"
        error={errors.nextOilChangeMileage}
      />

      <Text className="text-sm font-medium text-gray-700 mb-2">Statut</Text>
      <View className="flex-row gap-2 mb-6">
        {STATUS_LIST.map((status) => (
          <Pressable
            key={status}
            onPress={() => setSelectedStatus(status)}
            className={`flex-1 py-3 rounded-xl items-center border ${
              selectedStatus === status ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-200'
            }`}
          >
            <Text
              className={`text-xs text-center ${
                selectedStatus === status ? 'text-white font-semibold' : 'text-gray-700'
              }`}
            >
              {STATUS_LABELS[status]}
            </Text>
          </Pressable>
        ))}
      </View>

      <AppButton
        label={isEditing ? 'Enregistrer les modifications' : 'Ajouter le camion'}
        onPress={handleSubmit}
      />
      <View className="h-8" />
    </ScrollView>
  );
}
