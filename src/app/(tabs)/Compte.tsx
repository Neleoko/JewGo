import {View} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useContext} from "react";
import {StatusBarColorContext} from "../../contexts/StatusBarColorContext";

export default function Home() {
    const { statusBarColor } = useContext(StatusBarColorContext);
    return (
        <View className={"flex-1 items-center"}>
            <StatusBar backgroundColor={statusBarColor} style={"dark"}/>
        </View>
    )
}