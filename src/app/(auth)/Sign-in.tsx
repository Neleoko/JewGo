import {View, Text, SafeAreaView} from "react-native";
import React from "react";
import {router} from "expo-router";
import {ButtonCustom} from "../../components/ButtonCustom";
import {StatusBar} from "expo-status-bar";

export default function SignIn() {
    return (
        <SafeAreaView className={"flex-1 items-center"}>
            <StatusBar backgroundColor={"#F4F4F9"} style={"dark"}/>
            <View>
                <Text>Sign In</Text>
                <ButtonCustom
                    title={"Connexion"}
                    handlePress={() => router.push('/Home')}
                />
            </View>
        </SafeAreaView>

    )
}