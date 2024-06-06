import {View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Linking, Platform} from "react-native";
import React from "react";
import { Entypo } from '@expo/vector-icons';
import {useLocalSearchParams} from "expo-router";
import {ButtonHome} from "../../components/ButtonHome";


export default function eventView() {
    const params = useLocalSearchParams();
    const evenement = JSON.parse(params.evenement as string)

    const  linkMaps = () => {
        const address = "3 rue de la paix 75000 Paris"
        const url = Platform.select({
            ios: `maps:0,0?q=${address}`,
            android: `geo:0,0?q=${address}`,
        });
        Linking.openURL(url);
    }

    return (
        <SafeAreaView className={"flex-1"}>
            <ScrollView className={"flex-1"} style={{backgroundColor:"#F4F4F9"}}>
                <View className={"flex-1 justify-center m-5 rounded-lg bg-white p-3 flex-col border-2 border-gray-400"}>
                    <Entypo name="share" size={24} color="black" className={"items-end"} />
                    <View className={"items-center mb-5"}>
                        <Text className={"text-4xl font-bold text-center mb-1"}>{evenement.title}</Text>
                        <Text className={"text-3xl font-bold text-center"}>{params.date}</Text>
                        <Text className={"text-3xl text-center"}>19h25</Text>
                    </View>
                    <View className={"items-center"}>
                        <Image
                            className={"border-2"}
                            style={{width: 350, height: 325}}
                            resizeMode={"contain"}
                            source={evenement.image}
                        />
                    </View>
                    <View className={"flex-row flex-wrap justify-center"}>
                        <View className={"rounded-3xl bg-gray-800 mx-1 mt-3 items-center"}>
                            <Text className={"text-white px-4 py-1"}>Shabbat</Text>
                        </View>
                        <View className={"rounded-3xl bg-gray-800 mx-1 mt-3"}>
                            <Text className={"text-white px-4 py-1"}>AfterWork</Text>
                        </View>
                        <View className={"rounded-3xl bg-gray-800 mx-1 mt-3"}>
                            <Text className={"text-white px-4 py-1"}>AfterWork</Text>
                        </View>
                        <View className={"rounded-3xl bg-gray-800 mx-1 mt-3"}>
                            <Text className={"text-white px-4 py-1"}>AfterWork</Text>
                        </View>
                        <View className={"rounded-3xl bg-gray-800 mx-1 mt-3"}>
                            <Text className={"text-white px-4 py-1"}>Shabbat</Text>
                        </View>
                        <View className={"rounded-3xl bg-gray-800 mx-1 mt-3"}>
                            <Text className={"text-white px-4 py-1"}>Shabbat</Text>
                        </View>
                        <View className={"rounded-3xl bg-gray-800 mx-1 mt-3"}>
                            <Text className={"text-white px-4 py-1"}>AfterWork</Text>
                        </View>
                        <View className={"rounded-3xl bg-gray-800 mx-1 mt-3"}>
                            <Text className={"text-white px-4 py-1"}>AfterWork</Text>
                        </View>
                        <View className={"rounded-3xl bg-gray-800 mx-1 mt-3"}>
                            <Text className={"text-white px-4 py-1"}>AfterWork</Text>
                        </View>
                    </View>
                    <View className={"m-4"}>
                        <Text className={"text-center text-lg"}>
                            Hello les ami(e)s voici les informations du 3×45 de ce jeudi 6 juin avec le partenariat exceptionnel de Olami saint-mandé 🥳🥳🥳
                            exceptionnellement le jeudi{"\n"}
                            {"\n"}
                            20h : C'EST CACHER ? ✡{"\n"}
                            Sur le thème :{"\n"}
                            Tout savoir sur le cacher, le lait chamour, la production de fromage...{"\n"}
                            Présence exceptionnelle du Rav Parsy qui nous parlera des secrets de la fête de Chavouot{"\n"}
                            {"\n"}
                            20h45 : ATELIER FROMAGE 🧀{"\n"}
                            Apprendre à faire un fromage artisanal{"\n"}
                            {"\n"}
                            21h30 : DÉGUSTATION 😋{"\n"}
                            Dégustation de plusieurs sortes de fromages, paninis, pizzas, bons vins...{"\n"}

                        </Text>
                        <View>
                            <Text className={"text-lg mb-2"}>
                                Age moyen : {evenement.publicAgeMin} - {evenement.publicAgeMax} ans
                            </Text>
                        </View>
                        <View>
                            <Text className={"text-lg mb-2"}>
                                Public : {evenement.publicSexe}
                            </Text>
                        </View>
                        <View>
                            <Text className={"text-lg mb-2"}>
                                Lieu :{" "}
                                <Text className={"text-lg mb-2 text-blue-800"} onPress={linkMaps}>
                                    3 rue de la paix 75000 Paris
                                </Text>
                            </Text>
                        </View>
                    </View>
                    <View className={"my-5 mx-10"}>
                        <ButtonHome title={'S\'inscrire'} handlePress={async () => {
                            await Linking.openURL('https://www.google.com')
                        }}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}