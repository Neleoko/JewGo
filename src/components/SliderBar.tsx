import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

export default function App() {
    const [value, setValue] = useState(0);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={100}
                onValueChange={(value) => setValue(value)}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
            />
            <Text>Value: {value}</Text>
        </View>
    );
}