import {View, Text, SafeAreaView, ScrollView} from "react-native";
import React from "react";
import { Entypo } from '@expo/vector-icons';


export default function eventView() {
    return (
        <SafeAreaView className={"flex-1"}>
            <ScrollView className={"flex-1"} style={{backgroundColor:"#F4F4F9"}}>
                <View className={"flex-1 justify-center m-5 border-2 rounded-lg bg-white p-3 flex-col"}>
                    <Entypo name="share" size={24} color="black" className={"items-end"} />
                    <Text className={"text-2xl font-bold"}>Mardi 19 Mars</Text>
                    <Text className={"text-xl"}>Cours de Halakha</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}