import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {ButtonCustom} from "./ButtonCustom";
import SliderBar from './SliderBar';
import Slider from "@react-native-community/slider";

function Button(props: { onPress: () => void, title: string }) {
    return null;
}

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [valueSlider, setValueSlider] = useState(0);


    const handleSearch = (query) => {
        setSearchQuery(query);
        // Ajoutez ici la logique de recherche
    };

    const toggleModal = () => {
        console.log("toggleModal");
        setModalVisible(!modalVisible);
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
            <TouchableOpacity onPress={toggleModal} className={"px-1"}>
                <Ionicons name="filter" size={24} color="black" />
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModal}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 5 }}>
                        <Text>Filtre 1</Text>
                        <Text>Filtre 2</Text>
                        <Text>Filtre 3</Text>
                        <Slider
                            style={{width: 200, height: 40}}
                            minimumValue={0}
                            maximumValue={100}
                            onValueChange={(value) => setValueSlider(value)}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#000000"
                        />
                        {/*<View className={"flex-row"}>*/}
                            {/*<ButtonCustom title="Fermer" handlePress={toggleModal}/>*/}
                            {/*<ButtonCustom title="Appliquer" handlePress={toggleModal}/>*/}
                        {/*</View>*/}
                    </View>
                </View>
            </Modal>
        </View>
    );
}