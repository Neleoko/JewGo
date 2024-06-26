import React, { useState, ComponentType } from 'react';
import {Text, TouchableOpacity, View} from "react-native";

export type ButtonProps = {
    title: string,
    isClickable?: boolean,
    onSelect?: (value: string) => void
}

export const Categorie = ({title,isClickable = false, onSelect}: ButtonProps) => {
    const [isSelected, setIsSelected] = useState(false);

    const handlePress = () => {
        setIsSelected(!isSelected);
        onSelect && onSelect(title); // Vérifier si onSelect existe avant de l'appeler
    };

    const Component: ComponentType<any> = isClickable ? TouchableOpacity : View;

    return (
        <Component onPress={isClickable ? handlePress : undefined}>
            <View
                className={"rounded-2xl mx-1 mt-3 items-center border-2"}
                style={{
                    backgroundColor: isSelected ? '#082385' : '#FFFFFF',
                    borderColor: '#082385'
                }}
            >
                <Text className={`px-4 py-1 ${isSelected ? 'text-white' : 'text-black'}`}>{title}</Text>
            </View>
        </Component>
    )
};