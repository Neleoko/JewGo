import {Button, SafeAreaView, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useContext, useEffect, useState} from "react";
import {StatusBarColorContext} from "../../contexts/StatusBarColorContext";
import InputCustom from "../../components/InputCustom";
import { firestore } from "../../firebase";
import {ButtonCustom} from "../../components/ButtonCustom";
import DatePicker from 'react-native-neat-date-picker';
import { LogBox } from 'react-native';
import { collection, doc, setDoc, getDoc, arrayUnion, updateDoc } from "firebase/firestore";

LogBox.ignoreLogs(['Warning: NeatDatePicker']);
export default function NewEvent() {
    const [statusBarColor, setStatusBarColor] = useState('#F4F4F9');

    const [title, setTitle] = useState('');
    const [nomAsso, setNomAsso] = useState('');
    const [image, setImage] = useState('');
    const [logoAsso, setLogoAsso] = useState('');
    const [rabbin, setRabbin] = useState('');
    const [publicSexe, setPublicSexe] = useState('');
    const [publicAgeMin, setPublicAgeMin] = useState('');
    const [publicAgeMax, setPublicAgeMax] = useState('');

    // Calendar

    const [showDatePickerSingle, setShowDatePickerSingle] = useState(false)
    const [dateEvent, setDateEvent] = useState('');

    const openDatePickerSingle = () => setShowDatePickerSingle(true)

    const onCancelSingle = () => {
        // You should close the modal in here
        setShowDatePickerSingle(false)
    }
    const onConfirmSingle = (output) => {
        // You should close the modal in here
        setShowDatePickerSingle(false)

        // The parameter 'output' is an object containing date and dateString (for single mode).
        // For range mode, the output contains startDate, startDateString, endDate, and EndDateString
        console.log(output)
        setDateEvent(output.dateString)
    }


    const setEvent = async () => {
        try {
            console.log(dateEvent);
            const newEventRef = doc(firestore, `dateEvents/${dateEvent}/events`);
            await setDoc(newEventRef, {
                title: title,
                nomAsso: nomAsso,
                image: image,
                logoAsso: logoAsso,
                rabbin: rabbin,
                publicSexe: publicSexe,
                publicAgeMin: publicAgeMin,
                publicAgeMax: publicAgeMax
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <StatusBarColorContext.Provider value={{ statusBarColor, setStatusBarColor }}>
            <SafeAreaView className={"flex-1 border-6 border-cyan-400"}>
                <View className={"flex-1"}>
                    <StatusBar backgroundColor={statusBarColor} style={"dark"}/>
                    <View className={"border-2 border-black"}>
                        <Text className={"text-2xl"}>Titre</Text>
                        <InputCustom onInputChange={(value: React.SetStateAction<string>) => setTitle(value)} />
                    </View>
                    <View className={"border-2 border-black"}>
                        <Text className={"text-2xl"}>Nom de l'association</Text>
                        <InputCustom onInputChange={(value: React.SetStateAction<string>) => setNomAsso(value)} />
                    </View>
                    <View className={"border-2 border-black"}>
                        <Text className={"text-2xl"}>Image</Text>
                        <InputCustom onInputChange={(value: React.SetStateAction<string>) => setImage(value)} />
                    </View>
                    <View className={"border-2 border-black"}>
                        <Text className={"text-2xl"}>Logo de l'association</Text>
                        <InputCustom onInputChange={(value: React.SetStateAction<string>) => setLogoAsso(value)} />
                    </View>
                    <View className={"border-2 border-black"}>
                        <Text className={"text-2xl"}>Rabbin</Text>
                        <InputCustom onInputChange={(value: React.SetStateAction<string>) => setRabbin(value)} />
                    </View>
                    <View className={"border-2 border-black"}>
                        <Text className={"text-2xl"}>Public sexe</Text>
                        <InputCustom onInputChange={(value: React.SetStateAction<string>) => setPublicSexe(value)} />
                    </View>
                    <View className={"border-2 border-black"}>
                        <Text className={"text-2xl"}>Age minimum</Text>
                        <InputCustom onInputChange={(value: React.SetStateAction<string>) => setPublicAgeMin(value)} />
                    </View>
                    <View className={"border-2 border-black"}>
                        <Text className={"text-2xl"}>Age maximum</Text>
                        <InputCustom onInputChange={(value: React.SetStateAction<string>) => setPublicAgeMax(value)} />
                    </View>
                    <ButtonCustom title={"Créer l'événement"} handlePress={setEvent} />
                    <Button title={'single'} onPress={openDatePickerSingle} />
                    <DatePicker
                        isVisible={showDatePickerSingle}
                        mode={'single'}
                        onCancel={onCancelSingle}
                        onConfirm={onConfirmSingle}
                        language={'fr'}
                        dateStringFormat={'dd-mm-yyyy' as any}
                    />

                </View>
            </SafeAreaView>
        </StatusBarColorContext.Provider>
    )
}