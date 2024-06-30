import React, {useState, ComponentType, useContext} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {ThemeContext} from "../contexts/ThemeContext";

export type ButtonProps = {
    title: string,
    isClickable?: boolean,
    onSelect?: (value: string) => void,
    isSelected: boolean
}

export const SingleChoice = ({title, isClickable = false, onSelect, isSelected}: ButtonProps) => {
    const themeContextValue = useContext(ThemeContext);
    const handlePress = () => {
        onSelect && onSelect(title); // Vérifier si onSelect existe avant de l'appeler
    };

    return (
        <TouchableOpacity onPress={isClickable ? handlePress : undefined}>
            <View
                className={`rounded-2xl mx-1 mt-3 items-center border-2`}
                style={{
                    backgroundColor: isSelected ? themeContextValue.secondaryColor : '#FFFFFF',
                    borderColor: themeContextValue.secondaryColor
                }}
            >
                <Text className={`px-4 py-1 ${isSelected ? 'text-white' : 'text-black'}`}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
};