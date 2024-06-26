import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    Linking,
    Platform, TouchableOpacity,
} from "react-native";
import React from "react";
import { Entypo } from '@expo/vector-icons';
import {useLocalSearchParams} from "expo-router";
import {ButtonCustom} from "../../components/ButtonCustom";
import {Categorie} from "../../components/Categorie";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {StatusBar} from "expo-status-bar";

export default function EventView() {
    const params = useLocalSearchParams();
    const evenement = JSON.parse(params.evenement as string)
    const navigation = useNavigation();

    const onShare = async () => {
        alert("Share")
    }
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
            <StatusBar backgroundColor={"#F4F4F9"} style={"dark"}/>
            <ScrollView className={"flex-1"} style={{backgroundColor:"#F4F4F9"}}>
                <View className={"flex-1 justify-center m-5 rounded-lg bg-white p-3 flex-col border-2"} style={{borderColor: "#08238550"}}>
                    <View className={"flex-row justify-between my-2 mr-2"}>
                        <TouchableOpacity
                        onPress={() => {
                            navigation.goBack()
                        }}>
                            <Ionicons name="arrow-back-outline" size={30} color="black" />
                        </TouchableOpacity>

                        <Entypo name="share" size={24} color="black" onPress={onShare} />
                    </View>
                    <View className={"items-center mb-5"}>
                        <Text className={"text-4xl font-bold text-center mb-1"}>{evenement.title}</Text>
                        <Text className={"text-3xl font-bold text-center"}>{params.date}</Text>
                        <Text className={"text-3xl text-center"}>19h25</Text>
                    </View>
                    <View className={"items-center"}>
                        {/*<TouchableOpacity onPress={() => router.navigate({*/}
                        {/*    pathname: '/imageView',*/}
                        {/*}) }>*/}
                            <Image
                                className={"border-2"}
                                style={{width: 350, height: 325}}
                                resizeMode={"contain"}
                                source={evenement.image}
                            />
                        {/*</TouchableOpacity>*/}
                    </View>
                    <View className={"flex-row flex-wrap justify-center"}>
                        <Categorie title={"Shabbath"}/>
                        <Categorie title={"Cacher"}/>
                        <Categorie title={"Cuisine"}/>
                        <Categorie title={"AfterWork"}/>
                        <Categorie title={"Cours"}/>
                        <Categorie title={"Shabbath"}/>
                        <Categorie title={"Cacher"}/>
                        <Categorie title={"Cuisine"}/>
                        <Categorie title={"AfterWork"}/>


                    </View>
                    <View className={"m-4"}>
                        <Text className={"text-lg"}>
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
                    <View className={"pb-20"} />
                </View>
            </ScrollView>
            <View className={"absolute bottom-0 w-full items-center justify-center mb-12"}>
                <ButtonCustom title={'S\'inscrire'} handlePress={async () => {
                    await Linking.openURL('https://www.google.com')
                }}
                />
            </View>
        </SafeAreaView>
    )
}