import React, { useState } from 'react';
import { TextInput } from 'react-native';

export default function InputCustom({ onInputChange }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (value: string) => {
        setInputValue(value);
        onInputChange(value);
    };

    return (
        <TextInput value={inputValue} onChangeText={handleInputChange} />
    );
}