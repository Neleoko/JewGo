import React from 'react';
import { View, Text } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

interface SliderBarProps {
    onValuesChange: (values: number[]) => void;
}

export default function SliderBarAge({ onValuesChange }: SliderBarProps) {
    const [multiSliderValue, setMultiSliderValue] = React.useState([0, 100]);

    const multiSliderValuesChange = (values: number[]) => {
        setMultiSliderValue(values);
        onValuesChange(values);
    };

    return (
        <View>
            <Text className={"font-bold text-gray-900 text-lg"}>Age : {multiSliderValue[0]} - {multiSliderValue[1]}</Text>
            <View className={"justify-center items-center"}>
                <MultiSlider
                    values={[multiSliderValue[0], multiSliderValue[1]]}
                    sliderLength={300} // Increase the length of the slider
                    onValuesChange={multiSliderValuesChange}
                    min={0}
                    max={100}
                    step={1}
                    allowOverlap={false}
                    snapped
                    selectedStyle={{ backgroundColor: '#082385' }} // Set the selected track color to white
                    markerStyle={{ height: 28, width: 28, borderRadius: 14, backgroundColor: 'white', borderWidth: 2, borderColor: '#082385' }} // Set the marker styles
                />
            </View>
        </View>
    );
}