import React, {useContext, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {ThemeContext} from "../contexts/ThemeContext";
import {Entypo} from "@expo/vector-icons";

export default function InputCustom({ onInputChange, title, isMultiline, placeHolder, isRequired, isNumeric }) {
    const [inputValue, setInputValue] = useState('');
    const themeContextValue = useContext(ThemeContext);

    const handleInputChange = (value: string) => {
        setInputValue(value);
        onInputChange(value);
    };

    return (
        <View className={"mb-2"}>
            <View className={"mb-1 flex-row"}>
                <Text className={`text-xl font-medium text-[${themeContextValue.textColor}]`}>{title}</Text>
                {isRequired && <Text style={{color: 'red'}}> *</Text>}
            </View>
            <View className={`flex border-2 rounded-lg py-2 px-3`} style={{borderColor: themeContextValue.secondaryColor}}>
                {isNumeric ? (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TextInput
                            value={inputValue}
                            onChangeText={handleInputChange}
                            multiline={isMultiline}
                            placeholder={placeHolder}
                            keyboardType="numeric" // Affiche un clavier numérique
                        />
                        <Text>€</Text>
                    </View>
                ) : (
                    <TextInput
                        value={inputValue}
                        onChangeText={handleInputChange}
                        multiline={isMultiline}
                        placeholder={placeHolder}
                    />
                )}
            </View>
        </View>
    );
}