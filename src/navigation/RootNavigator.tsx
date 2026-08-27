import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TruckStack } from './TruckStack';
import { STATUS_LABELS, STATUS_TAB_NAME } from '../constants/status';

const Tab = createBottomTabNavigator();

const TAB_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  [STATUS_TAB_NAME.active]: 'checkmark-circle-outline',
  [STATUS_TAB_NAME.stopped]: 'pause-circle-outline',
  [STATUS_TAB_NAME.maintenance]: 'build-outline',
};

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#2563EB',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={TAB_ICONS[route.name]} size={size} color={color} />
          ),
        })}
      >
        <Tab.Screen name={STATUS_TAB_NAME.active} options={{ title: STATUS_LABELS.active }}>
          {() => <TruckStack status="active" />}
        </Tab.Screen>
        <Tab.Screen name={STATUS_TAB_NAME.stopped} options={{ title: STATUS_LABELS.stopped }}>
          {() => <TruckStack status="stopped" />}
        </Tab.Screen>
        <Tab.Screen
          name={STATUS_TAB_NAME.maintenance}
          options={{ title: STATUS_LABELS.maintenance }}
        >
          {() => <TruckStack status="maintenance" />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
