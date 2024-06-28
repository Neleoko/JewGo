import React, {useContext} from 'react';
import { View, Text } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {ThemeContext} from "../contexts/ThemeContext";

interface SliderBarProps {
    onValuesChange: (values: number[]) => void;
    initialValueMin?: number;
}

export default function SliderBarAge({ onValuesChange, initialValueMin }: SliderBarProps) {
    const [multiSliderValue, setMultiSliderValue] = React.useState([initialValueMin? initialValueMin:0, 100]);
    const themeContextValue = useContext(ThemeContext);
    const multiSliderValuesChange = (values: number[]) => {
        setMultiSliderValue(values);
        onValuesChange(values);
    };

    return (
        <View>
            <Text className={`font-bold text-lg ${themeContextValue.textColor}`}>Age : {multiSliderValue[0]} - {multiSliderValue[1]}</Text>
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
                    selectedStyle={{ backgroundColor: themeContextValue.secondaryColor }}
                    markerStyle={{
                        height: 28,
                        width: 28,
                        borderRadius: 14,
                        backgroundColor: 'white',
                        borderWidth: 2,
                        borderColor: themeContextValue.secondaryColor
                    }}
                />
            </View>
        </View>
    );
}