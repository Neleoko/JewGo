import {View, Text} from "react-native";
import React from "react";
import {router} from "expo-router";
import {ButtonHome} from "../../components/ButtonHome";

export default function SignIn() {
    return (
        <View>
            <Text>Sign In</Text>
            <ButtonHome
                title={"Connexion"}
                handlePress={() => router.push('/home')}
            />
        </View>
    )
}