import {Text, TouchableOpacity, View} from "react-native";
import {useContext} from "react";
import {ThemeContext} from "../contexts/ThemeContext";


export type ButtonProps = {
    title: string,
    handlePress: () => void,
    styleNativeWind?: string
}
export const ButtonCustom = ({title, handlePress, styleNativeWind}: ButtonProps) => {
    const themeContextValue = useContext(ThemeContext);
    return (
        <TouchableOpacity
            className={`justify-center items-center rounded-md py-5 shadow-xl shadow-black ${styleNativeWind}`}
            style={{backgroundColor: themeContextValue.secondaryColor, paddingHorizontal: 115}}
            onPress={handlePress}
        >
            <Text className={"text-xl text-white font-bold"}>{title}</Text>
        </TouchableOpacity>
    )
};