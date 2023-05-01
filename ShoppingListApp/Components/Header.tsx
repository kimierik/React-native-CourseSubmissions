
import { View, Text, StyleSheet } from "react-native"



export default function Header(){
    

    return(
        <View style={styles.container}>
            <Text>Shopping List</Text>
        </View>
    )



}


const styles=StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#000',
        borderWidth:2,
        width:'100%',
        height:'10%',
    },
})
