import {Text, TouchableOpacity, View} from "react-native";


export type ButtonProps = {
    title: string,
}
export const Categorie = ({title}: ButtonProps) => {
    return (
        <View
            className={"rounded-2xl mx-1 mt-3 items-center border-2"}
            style={{
                // backgroundColor: '#082385'
                borderColor: '#082385',
        }}
        >
            <Text className={"px-4 py-1"}>{title}</Text>
        </View>
    )
};