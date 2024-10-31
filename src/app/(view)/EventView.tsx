import {
    ActivityIndicator, Image, ImageBackground,
    Linking,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useLocalSearchParams} from "expo-router";
import React, {useContext, useEffect, useState} from "react";
import {ThemeContext} from "../../contexts/ThemeContext";
import {getEventByDateAndId} from "../../firebase/query/eventService";
import {StatusBar} from "expo-status-bar";
import {AntDesign, Entypo, Ionicons} from "@expo/vector-icons";
import {Categorie} from "../../components/Categorie";
import Markdown from "react-native-markdown-display";
import {ButtonCustom} from "../../components/ButtonCustom";
import {EventInterface} from "../../interfaces/EventInterface";
import {formateDate} from "../../utils/dateUtils";
import characterUtils from "../../utils/characterUtils";

export default function NewEvent() {
    const params = useLocalSearchParams();
    const date = params.date as string;
    const id = params.id as string;

    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(false);
    const [eventData, setEventData] = useState<EventInterface | null>(null);

    const themeContextValue = useContext(ThemeContext);

    const onShare = async () => {
        alert("Share")
    }
    const linkMaps = () => {
        const address = "3 rue de la paix 75000 Paris"
        const url = Platform.select({
            ios: `maps:0,0?q=${address}`,
            android: `geo:0,0?q=${address}`,
        });
        Linking.openURL(url);
    }
    useEffect(() => {
        const fetchEvent = async () => {
            setIsLoading(true);
            const event = await getEventByDateAndId(date, id)
            setEventData(event as EventInterface)
            setIsLoading(false)
        };
        fetchEvent();
    }, []);

    return (
        <ThemeContext.Provider value={themeContextValue}>
            <SafeAreaView className={"flex-1"}>
                <StatusBar backgroundColor={"#F4F4F9"} style={"dark"}/>
                <ScrollView style={{backgroundColor: themeContextValue.primaryColor}}>
                    <View style={{borderColor: "#08238550"}} className={"justify-center m-5 rounded-lg bg-white p-3 flex-col border-2 min-h-fit"}>
                        {isLoading || !eventData ? (
                            <View className={"flex-1 justify-center items-center "}>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>
                        ) : (
                            <>
                                <View className={"flex-row justify-between my-2 mr-2"}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.goBack();
                                        }}>
                                        <Ionicons name="arrow-back-outline" size={30} color="black"/>
                                    </TouchableOpacity>
                                    <View className={"flex-row"}>
                                        <AntDesign name="edit" size={24} color="black" style={{paddingRight:10}} onPress={onShare}/>
                                        <Entypo name="share" size={24} color="black" onPress={onShare}/>
                                    </View>
                                </View>
                                <View className={"items-center mb-5"}>
                                    <Text className={"text-4xl font-bold text-center mb-1"}>{eventData.title}</Text>
                                    <Text className={"text-3xl font-bold text-center"}>{characterUtils(formateDate(date))}</Text>
                                    {eventData.time && (<Text className={"text-3xl text-center"}>{eventData.time}</Text>)}
                                    {eventData.guest && (<Text className={"text-3xl text-center"}>{eventData.guest}</Text>)}
                                </View>
                                {/*<View className={"items-center"}>*/}
                                <View className={'bg-white h-80 mx-6 justify-center items-center'}>
                                    <ImageBackground
                                        source={{ uri: eventData.image }}
                                        className="w-full h-full justify-center content-center rounded-lg"
                                        imageStyle={{borderRadius: 5}}
                                        blurRadius={10}
                                    >
                                        <Image
                                            resizeMode="contain"
                                            source={{uri: eventData.image}}
                                            className="w-full h-full rounded-lg border-black"
                                        />
                                    </ImageBackground>
                                </View>
                                {/*</View>*/}
                                <View className={"flex-row flex-wrap justify-center mt-4"}>
                                    {eventData.categories.map((category) => (
                                        <View
                                            className={`rounded-2xl mx-1 mt-3 items-center`}
                                            style={{
                                                backgroundColor: 'rgba(214,238,255,0.76)',
                                            }}
                                            key={category}
                                        >
                                            <Text className={`px-4 py-1`}>{category}</Text>
                                        </View>
                                        // <Categorie
                                        //     key={category}
                                        //     title={category}
                                        // />
                                    ))}
                                </View>
                                <View className={"m-4"}>
                                    <Markdown style={{body: {fontSize: 18}}}>
                                        {eventData.description}
                                    </Markdown>
                                    <View>
                                        <Text className={"text-lg mb-2"}>
                                            Age moyen : {eventData.publicAgeMin} - {eventData.publicAgeMax} ans
                                        </Text>
                                    </View>
                                    <View>
                                        <Text className={"text-lg mb-2"}>
                                            Public : {eventData.publicSexe}
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
                                {eventData.registrationLink && (
                                    <View className={"pb-20"}/>
                                )}
                            </>
                        )}
                    </View>
                </ScrollView>
                {isLoading || !eventData ? (
                    <View />
                ) : (
                    eventData && eventData.registrationLink ? (
                        <View className={"absolute bottom-0 w-full items-center mb-12"}>
                            <ButtonCustom title={'S\'inscrire'} handlePress={async () => {
                                await Linking.openURL(eventData.registrationLink)
                            }}/>
                        </View>
                    ) : null
                )}
            </SafeAreaView>
        </ThemeContext.Provider>
    );
}