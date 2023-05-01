import { View, Text, ScrollView , StyleSheet, TouchableHighlight,Image } from "react-native"

import Item from "../types/Item"

import Rtk from "../StateManagement/Rtk"

import { removeItem } from "../StateManagement/Rtk"


export default function ShoppingItem(props:Item){


    return(
        <View style={styles.container}>
            <View style={styles.innercontainer}>
                <View style={styles.text}>
                    <ScrollView>
                        <Text style={styles.textContent}>{props.name} X{props.quantity}</Text>
                    </ScrollView>
                </View>
                <View style={styles.button}>
                    <TouchableHighlight onPress={()=>{Rtk.dispatch(removeItem(props.id))}} >
                        <Image
                            style={styles.image}
                            source={require('../assets/bin.png')}
                        />
                    </TouchableHighlight>
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
        height:45,
        marginBottom:5,
        marginTop:5,
    },

    innercontainer:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    image:{
        borderWidth:1,
        borderColor:'#000',
        width:'100%',
        height:'100%',
        backgroundColor:'red',
    },

    text:{
        width:'80%',
    },
    textContent:{
        fontSize:30,
    },


    button:{
        width:'20%',
    },

})
