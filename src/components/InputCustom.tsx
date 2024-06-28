import React, {useContext, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {ThemeContext} from "../contexts/ThemeContext";

export default function InputCustom({ onInputChange, title }) {
    const [inputValue, setInputValue] = useState('');

    const themeContextValue = useContext(ThemeContext);

    const handleInputChange = (value: string) => {
        setInputValue(value);
        onInputChange(value);
    };

    return (
        <View className={"mb-2"}>
            <View className={"mb-1"}>
                <Text className={`text-xl font-medium text-[${themeContextValue.textColor}]`}>{title}</Text>
            </View>
            <View className={`flex border-2 rounded-lg py-2 px-3`} style={{borderColor: themeContextValue.secondaryColor}}>
                <TextInput value={inputValue} onChangeText={handleInputChange} />
            </View>
        </View>
    );
}