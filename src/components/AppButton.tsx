import React from 'react';
import { Pressable, Text, PressableProps } from 'react-native';

type Variant = 'primary' | 'danger' | 'outline';

interface Props extends PressableProps {
  label: string;
  variant?: Variant;
  className?: string;
}

const CONTAINER_STYLES: Record<Variant, string> = {
  primary: 'bg-blue-600',
  danger: 'bg-red-600',
  outline: 'bg-white border border-gray-300',
};

const TEXT_STYLES: Record<Variant, string> = {
  primary: 'text-white',
  danger: 'text-white',
  outline: 'text-gray-800',
};


export function AppButton({ label, variant = 'primary', className = '', ...props }: Props) {
  return (
    <Pressable
      className={`rounded-xl py-3.5 items-center ${CONTAINER_STYLES[variant]} ${className}`}
      {...props}
    >
      <Text className={`font-semibold text-base ${TEXT_STYLES[variant]}`}>{label}</Text>
    </Pressable>
  );
}
