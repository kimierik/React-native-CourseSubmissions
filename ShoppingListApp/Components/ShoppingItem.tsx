import { View, Text, Button, StyleSheet } from "react-native"

import Item from "../types/Item"

import Rtk from "../StateManagement/Rtk"

import { removeItem } from "../StateManagement/Rtk"


export default function ShoppingItem(props:Item){


    return(
        <View style={styles.container}>

            <View style={styles.innercontainer}>

            
                <View style={styles.text}>
                    <Text>{props.name} X{props.quantity}</Text>
                </View>

                <View style={styles.button}>
                    <Button
                        title="d"
                        onPress={()=>{Rtk.dispatch(removeItem(props.id))}}
                    />
                </View>

            
            </View>
        </View>
    )

}


const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'flex-start',
        justifyContent:'center',
        borderColor:'#000',
        borderWidth:2,
    },

    innercontainer:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },

    text:{
        width:'80%'
    },


    button:{
        width:'20%',
    },

})
