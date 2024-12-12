import {ActivityIndicator, Text, TouchableOpacity, View} from "react-native";
import {useContext} from "react";
import {ThemeContext} from "../contexts/ThemeContext";

export type ButtonProps = {
    title: string,
    handlePress: () => void,
    styleNativeWind?: string,
    isLoading?: boolean,
    isDisabled?: boolean
}

export const ButtonCustom = ({title, handlePress, styleNativeWind, isLoading, isDisabled}: ButtonProps) => {
    const themeContextValue = useContext(ThemeContext);
    return (
        <TouchableOpacity
            className={`justify-center items-center rounded-3xl shadow-xl shadow-black ${styleNativeWind}`}
            style={{backgroundColor: isDisabled ? 'gray' : themeContextValue.secondaryColor}}
            onPress={handlePress}
            disabled={isDisabled}
        >
            {isLoading ? (
                <View className={"flex-row items-center"}>
                    <ActivityIndicator size="small" color="#fff"/>
                </View>
            ) : (
                <Text className={"text-xl text-white font-medium"}>{title}</Text>
            )}
        </TouchableOpacity>
    )
};