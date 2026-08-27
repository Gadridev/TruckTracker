import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  label: string;
  error?: string;
}

export function FormInput({ label, error, ...inputProps }: Props) {
  return (
    <View className="mb-4">
      <Text className="text-sm font-medium text-gray-700 mb-1.5">{label}</Text>
      <TextInput
        className={`bg-white border rounded-xl px-4 py-3 text-base text-gray-900 ${
          error ? 'border-red-400' : 'border-gray-200'
        }`}
        placeholderTextColor="#9CA3AF"
        {...inputProps}
      />
      {error ? <Text className="text-xs text-red-500 mt-1">{error}</Text> : null}
    </View>
  );
}
