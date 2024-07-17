import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomButton = ({
  title,
  containerStyles,
  textStyles,
  isLoading,
  handlePress,
}: {
  title: string;
  containerStyles: string;
  textStyles?: string;
  isLoading: boolean;
  handlePress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center 
        ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {' '}
        {title}{' '}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
