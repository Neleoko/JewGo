import React, {useContext, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {ThemeContext} from "../contexts/ThemeContext";
import {Entypo} from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';

export default function InputCustom({ onInputChange, title, isMultiline, placeHolder, isRequired, keyboardType, icon }) {
    const [inputValue, setInputValue] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const themeContextValue = useContext(ThemeContext);

    const handleInputChange = (value: string) => {
        setInputValue(value);
        onInputChange(value);
    };
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    return (
        <View className={"mb-2"}>
            <View className={"mb-1 flex-row"}>
                <Text className={`text-xl font-medium text-[${themeContextValue.textColor}]`}>{title}</Text>
                {isRequired && <Text style={{color: 'red'}}> *</Text>}
            </View>
            <View className={`flex border-2 rounded-lg py-2 px-3`} style={{borderColor: themeContextValue.secondaryColor}}>
                {keyboardType == "numeric" ? (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TextInput
                            value={inputValue}
                            onChangeText={handleInputChange}
                            multiline={isMultiline}
                            placeholder={placeHolder}
                            keyboardType={keyboardType}
                        />
                        <Text>€</Text>
                    </View>
                ) : (
                    <View className={"flex-row"}>
                        <View className={"mr-3 justify-center"}>
                            {icon === "mail" && (
                                <Octicons name="mail" size={20} color={`${themeContextValue.secondaryColor}`} />
                            )}
                            {icon === "lock" && (
                                <MaterialIcons name="lock" size={20} color={`${themeContextValue.secondaryColor}`} />
                            )}
                        </View>
                        <TextInput
                            value={inputValue}
                            onChangeText={handleInputChange}
                            multiline={isMultiline}
                            placeholder={placeHolder}
                            keyboardType={keyboardType}
                            secureTextEntry={keyboardType === "password" && !isPasswordVisible}
                            style={{ flex: 1 }}
                        />
                        {keyboardType === "password" && (
                            <TouchableOpacity className={"justify-center "} onPress={togglePasswordVisibility}>
                                <Entypo name={isPasswordVisible ? "eye" : "eye-with-line"} size={20} color={`rgba(0, 0, 0, 0.53)`} />
                            </TouchableOpacity>
                        )}

                    </View>

                )}
            </View>
        </View>
    );
}