import React, {useContext, useState} from 'react';
import { View, TextInput, TouchableOpacity, Text, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {ButtonCustom} from "./ButtonCustom";
import SliderBarAge from './SliderBarAge';
import { Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Filter from "./Filter";
import { StatusBarColorContext } from '../contexts/StatusBarColorContext';


export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [valueSlider, setValueSlider] = useState(0);

    const { setStatusBarColor } = useContext(StatusBarColorContext);

// Obtenez les dimensions de la fenêtre
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const handleSearch = (query) => {
        setSearchQuery(query);
        // Ajoutez ici la logique de recherche
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const handleFilterButtonClick = () => {
        if (modalVisible) {
            setStatusBarColor('#F4F4F9');
            console.log("Fermeture du modal");
        } else {
            setStatusBarColor('#FFFFFF');
            console.log("Ouverture du modal");
        }
        toggleModal();
    };

    return (
        <View className={"flex-row items-center my-2 p-3 bg-white rounded-lg shadow-md shadow-black border-2"} style={{borderColor: "#082385"}}>
            <TouchableOpacity className={"mr-2"}>
                <Ionicons name="search" size={24} color="black" />
            </TouchableOpacity>
            <TextInput
                style={{ flex: 1, marginRight: 10 }}
                placeholder="Rechercher..."
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <TouchableOpacity onPress={handleFilterButtonClick} className={"px-1"}>
                <Ionicons name="filter" size={24} color="black" />
            </TouchableOpacity>
            <Filter modalVisible={modalVisible} handleFilterButtonClick={handleFilterButtonClick} setStatusBarColor={setStatusBarColor}/>
        </View>
    );
}