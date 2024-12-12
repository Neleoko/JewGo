import React, {useContext, useEffect, useState} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Keyboard} from 'react-native';
import FlashMessage, {showMessage} from "react-native-flash-message";
import {StatusBar} from "expo-status-bar";
import {ThemeContext} from "../contexts/ThemeContext";
import {StatusBarColorContext} from "../contexts/StatusBarColorContext";
import InputCustom from "../components/InputCustom";
import characterUtils from "../utils/characterUtils";
import {formateDate} from "../utils/dateUtils";
import DatePickerNeat from "react-native-neat-date-picker";
import {ButtonCustom} from "../components/ButtonCustom";
import {onAuthStateChanged} from "firebase/auth";
import {firebaseAuth} from "../firebase/firebase";
import {addUserToFirestore} from "../firebase/query/userService";
import {router} from "expo-router";

export default function CreateProfile() {
    const themeContextValue = useContext(ThemeContext);
    const statusContextValue = useContext(StatusBarColorContext);

    const [pseudo, setPseudo] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(true);

    // DatePicker
    const [showDatePickerSingle, setShowDatePickerSingle] = useState(false)
    const [dateBirthday, setDateBirthday] = useState('');
    const openDatePickerSingle = () => {
        setShowDatePickerSingle(true)
    }

    const onCancelSingle = () => {
        setShowDatePickerSingle(false)
    }
    const onConfirmSingle = (output) => {
        setShowDatePickerSingle(false)
        setDateBirthday(output.dateString)
    }

    const handleDatePickerOpen = () => {
        Keyboard.dismiss();
        setTimeout(() => {
            openDatePickerSingle();
        }, 50);
    };

    // Firebase UID User
    const [uid, setUid] = useState(null);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setUid(user.uid);
            } else {
                console.log('No user is signed in.');
            }
        });
    }, []);

    // Enable/Disable button based on form fields
    useEffect(() => {
        if (pseudo && dateBirthday) {
            setIsDisable(false);
        } else {
            setIsDisable(true);
        }
    }, [pseudo, dateBirthday]);

    // Validation
    const validateProfile = () => {
        setIsLoading(true)
        Keyboard.dismiss();
        try {
            addUserToFirestore({
                uid: uid,
                pseudo: pseudo,
                dateBirthday: dateBirthday,
            });
            showMessage({
                message: "Succès",
                description: "Votre profil a été créé avec succès",
                type: "success",
                icon: "success",
                duration: 3000,
            });
            router.push("Home");
        } catch (error) {
            showMessage({
                message: "Erreur",
                description: error.message,
                type: "danger",
                icon: "danger",
                duration: 3000,
            });
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <SafeAreaView className={`flex-1`} style={{backgroundColor: themeContextValue.primaryColor}}>
            <FlashMessage position="top"/>
            <View className={`flex-1 justify-center mx-8`}>
                <StatusBar backgroundColor={`${statusContextValue.statusBarColor}`} style={"dark"}/>
                <InputCustom
                    title={"Nom d'utilisateur"}
                    onInputChange={setPseudo}
                    placeHolder={"Pseudo"}
                    isRequired={false}
                    isMultiline={false}
                    keyboardType={"default"}
                    icon={""}
                />

                <View className={"mb-1"}>
                    <Text className={`text-lg font-medium `}
                          style={{color: themeContextValue.textColor}}>Ton anniversaire</Text>
                </View>
                <TouchableOpacity className={`flex border-2 rounded-lg py-3 px-3`}
                                  style={{borderColor: themeContextValue.secondaryColor}}
                                  onPress={handleDatePickerOpen}>
                    <Text className={"text-md"} style={{color: themeContextValue.textColor}}>
                        {dateBirthday ?
                            characterUtils(formateDate(dateBirthday))
                            :
                            "Anniversaire"
                        }
                    </Text>
                </TouchableOpacity>
                <View className={"absolute bottom-0 items-center w-full mb-8"}>
                    <ButtonCustom title={"Valider"} handlePress={validateProfile} styleNativeWind={"px-32 py-4"}
                                  isLoading={isLoading} isDisabled={isDisable}/>
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
                    weekDaysColor: themeContextValue.secondaryColor,
                    dateTextColor: themeContextValue.textColor,
                }}/>
        </SafeAreaView>
    );
}