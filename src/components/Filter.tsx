import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import SliderBarAge from './SliderBarAge';

export default function Filter({ modalVisible, toggleModal }) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={toggleModal}
        >
            <View className={"bg-white p-7 flex-1"}>
                <View className={"flex-row justify-between"}>
                    <Text className={"text-2xl font-bold"}>Filtres</Text>
                    <TouchableOpacity onPress={toggleModal}>
                        <Entypo name="cross" size={40} color="#082385" />
                    </TouchableOpacity>
                </View>
                <SliderBarAge onValuesChange={(values) => console.log(values)} />
            </View>
        </Modal>
    );
}