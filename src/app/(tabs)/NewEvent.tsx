import {Button, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useContext, useEffect, useState} from "react";
import {StatusBarColorContext} from "../../contexts/StatusBarColorContext";
import InputCustom from "../../components/InputCustom";
import { firestore } from "../../firebase";
import {ButtonCustom} from "../../components/ButtonCustom";
import DatePickerNeat from 'react-native-neat-date-picker';
import { LogBox } from 'react-native';
import { collection, addDoc } from "firebase/firestore";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import {ThemeContext} from "../../contexts/ThemeContext";
import SliderBarAge from "../../components/SliderBarAge";
import FlashMessage, {showMessage} from "react-native-flash-message";

LogBox.ignoreLogs(['Warning: NeatDatePicker']);
export default function NewEvent() {
    const statusContextValue = React.useContext(StatusBarColorContext);
    const themeContextValue = useContext(ThemeContext);

    const [title, setTitle] = useState('');
    const [nomAsso, setNomAsso] = useState('');
    const [hourEvent, setHourEvent] = useState('');
    const [image, setImage] = useState('');
    const [rabbin, setRabbin] = useState('');
    const [publicSexe, setPublicSexe] = useState('');
    const [publicAgeMin, setPublicAgeMin] = useState(18);
    const [publicAgeMax, setPublicAgeMax] = useState(100);
    // Style
    const styleText = "text-xl font-medium text-black";

    // Calendar
    const [showDatePickerSingle, setShowDatePickerSingle] = useState(false)
    const [dateEvent, setDateEvent] = useState('');

    const openDatePickerSingle = () => setShowDatePickerSingle(true)

    const onCancelSingle = () => {
        setShowDatePickerSingle(false)
    }
    const onConfirmSingle = (output: { dateString: React.SetStateAction<string>; }) => {
        setShowDatePickerSingle(false)
        setDateEvent(output.dateString)
        console.log(output.dateString)
    }

    // Hours
    const [showTimePicker, setShowTimePicker] = useState(false)

    const setEvent = async () => {
        if (!dateEvent || !title || !nomAsso || !hourEvent || !image || !rabbin || !publicSexe) {
            showMessage({
                message: "Veuillez remplir toutes les informations du formulaire",
                type: "warning",
                autoHide: true,
                duration: 2000,
            });
            return;
        }
        try {
            const newEventRef = collection(firestore, `/dateEvents/${dateEvent}/events`);
            await addDoc(newEventRef, {
                title: title,
                nomAsso: nomAsso,
                image: image,
                rabbin: rabbin,
                publicSexe: publicSexe,
                publicAgeMin: publicAgeMin,
                publicAgeMax: publicAgeMax
            });
            showMessage({
                message: "Événement créé avec succès",
                type: "success",
                autoHide: true,
                duration: 2000,
            });
        } catch (e) {
            showMessage({
                message: "Une erreur est survenue",
                type: "danger",
                autoHide: true,
                duration: 2000,
            })
        }
    }

    return (
        <StatusBarColorContext.Provider value={statusContextValue}>
            <StatusBar backgroundColor={statusContextValue.statusBarColor} style={"dark"}/>
            <SafeAreaView className={"flex-1"}>
                <View className={"items-center justify-center mt-5"}>
                    <Text className={"text-2xl font-bold"}>Créer un événement</Text>
                </View>
                <ScrollView className={`flex-1 mx-5`} showsVerticalScrollIndicator={false}>
                    <View className={"flex-row justify-between mb-3"}>
                        <View>
                            <Text className={styleText}>Date :</Text>
                            <TouchableOpacity className={`flex border-2 rounded-lg py-2 px-3`}
                                              style={{borderColor: themeContextValue.secondaryColor}}
                                              onPress={openDatePickerSingle}>
                                <Text className={"text-md"}>
                                    {dateEvent ?
                                        capitalizeFirstLetter(format(dateEvent, "eeee dd MMM", { locale: fr }))
                                        :
                                        "Choisir une date"
                                    }
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text className={styleText}>À : </Text>
                            <TouchableOpacity className={`flex border-2 rounded-lg py-2 px-3`}
                                              style={{borderColor: themeContextValue.secondaryColor}}>
                                <Text>Choisir une heure</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <DatePickerNeat
                        isVisible={showDatePickerSingle}
                        mode={'single'}
                        onCancel={onCancelSingle}
                        onConfirm={onConfirmSingle}
                        language={'fr'}
                        dateStringFormat={'yyyy-mm-dd'}
                        colorOptions={{
                            headerColor: themeContextValue.secondaryColor,
                            confirmButtonColor: themeContextValue.secondaryColor,
                            selectedDateBackgroundColor: themeContextValue.secondaryColor,
                            weekDaysColor: themeContextValue.secondaryColor
                    }}/>
                    <InputCustom
                        onInputChange={(value: React.SetStateAction<string>) => setTitle(value)}
                        title={"Titre"}
                    />
                    <InputCustom
                        onInputChange={(value: React.SetStateAction<string>) => setNomAsso(value)}
                        title={"Nom de l'association"}
                    />
                    <InputCustom
                        onInputChange={(value: React.SetStateAction<string>) => setHourEvent(value)}
                        title={"Heure"}
                    />
                    <InputCustom
                        onInputChange={(value: React.SetStateAction<string>) => setImage(value)}
                        title={"Image"}
                    />
                    <InputCustom
                        onInputChange={(value: React.SetStateAction<string>) => setRabbin(value)}
                        title={"Rabbin"}
                    />
                    <InputCustom
                        onInputChange={(value: React.SetStateAction<string>) => setPublicSexe(value)}
                        title={"Sexe"}
                    />
                    <SliderBarAge onValuesChange={(values) => {
                        setPublicAgeMin(values[0]);
                        setPublicAgeMax(values[1]);
                    }}
                                  initialValueMin={18}/>
                    <View style={{ height: 85 }} />
                </ScrollView>
                <View className={"absolute bottom-0 items-center w-full mb-8"}>
                    <ButtonCustom title={"Créer"} handlePress={setEvent} />
                </View>
                <FlashMessage position="top" />
            </SafeAreaView>
        </StatusBarColorContext.Provider>

    )
}