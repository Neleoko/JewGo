import {Button, Image, ImageSourcePropType, Text, TouchableOpacity, View} from "react-native";

export type EvenementProps = {
    evenement: {
        id: number
        title: string
        nomAsso: string
        image: ImageSourcePropType
        logoAsso: ImageSourcePropType
        rabbin: string
        publicSexe: string
        publicAgeMin: number
        publicAgeMax: number
    },
    handlePress?: () => void
}

export const Evenement = (props: EvenementProps) => {
    return (
        <TouchableOpacity
            className={"flex-1 flex-row items-center my-2 p-3 bg-white rounded-lg border-2"}
            style={{elevation: 5}}
            activeOpacity={0.8}
            onPress={props.handlePress}
        >
            <Image
                resizeMode="contain"
                className={"border-2"}
                style={{width: 120, height: 125}}
                source={props.evenement.image}
            />
            <View className={"flex-col flex-1 ml-2"}>
                <View className={"flex-row"}>
                    <View className={"flex-col flex-1"}>
                        <Text className={"font-semibold text-xl"}>{props.evenement.title}</Text>
                        <Text className={"font-medium text-l"}>{props.evenement.rabbin}</Text>
                    </View>
                    <View>
                        <Image
                            className={"w-10 h-10 rounded-md"}
                            source={props.evenement.logoAsso}
                        />
                    </View>
                </View>
                <View className={"flex-row pt-5"}>
                    <Text className={"font-medium"}>Public
                        : {props.evenement.publicSexe} - {props.evenement.publicAgeMin} à {props.evenement.publicAgeMax} ans</Text>
                </View>
                <View>

                </View>
                <View>
                    <Text>STARS ⭐⭐⭐⭐⭐ </Text>
                </View>
            </View>

        </TouchableOpacity>
    );
};

