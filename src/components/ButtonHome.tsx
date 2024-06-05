import {Text, TouchableOpacity, View} from "react-native";


export type ButtonProps = {
    title: string,
    handlePress: () => void,
}
export const ButtonHome = ({title, handlePress}: ButtonProps) => {
    return (
        <TouchableOpacity
            className={"align-center justify-center py-5 rounded-md border-2"}
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 20,
                paddingHorizontal: 80,
                marginBottom: 30,
                backgroundColor: '#95929210',
                borderRadius: 30,
                borderWidth: 2,
                borderColor: '#959292'
        }}
            onPress={handlePress}
        >
            <Text>{title}</Text>
        </TouchableOpacity>
    )
};