import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TruckStackParamList } from './types';
import { TruckListScreen } from '../screens/TruckListScreen';
import { TruckDetailScreen } from '../screens/TruckDetailScreen';
import { TruckFormScreen } from '../screens/TruckFormScreen';
import { TruckStatus } from '../types/truck';
import { STATUS_LABELS } from '../constants/status';

const Stack = createNativeStackNavigator<TruckStackParamList>();

interface Props {
  status: TruckStatus;
}

// One Stack Navigator per tab: List -> Detail -> Add/Edit form.
// The status is fixed here as the List screen's initial param.
export function TruckStack({ status }: Props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTitleStyle: { fontWeight: '600' },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="TruckList"
        component={TruckListScreen}
        initialParams={{ status }}
        options={{ title: STATUS_LABELS[status] }}
      />
      <Stack.Screen
        name="TruckDetail"
        component={TruckDetailScreen}
        options={{ title: 'Détail du camion' }}
      />
      <Stack.Screen
        name="TruckForm"
        component={TruckFormScreen}
        options={({ route }) => ({
          title: route.params.truckId ? 'Modifier le camion' : 'Ajouter un camion',
        })}
      />
    </Stack.Navigator>
  );
}
