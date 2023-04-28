import { StyleSheet } from 'react-native';
import {useContext, useState} from 'react';
import {  Text, View , TextInput, Button} from 'react-native';
import AppContext from '../modules/AppContext';
import {City} from '../types/City';
import { dbWrapper } from '../modules/DbWrapper';

export default function AddCity(){
    const [cityName, setCityname]=useState<string>("");
    const [cityCountry, setCityCountry]=useState<string>("");
    const context =useContext(AppContext)

    function buttonHandler(){
        const cit={
            name:cityName,
            country:cityCountry,
            locations:undefined,
            id:context.getid()
        }
        const narr=[...context.cities]// mem nuke was needed for something
        narr.push(cit);
        context.cities=narr;
        dbWrapper.ResetDb(context.cities)
    }


    return (
     <View style={styles.container}>
        <View style={styles.inputs}>
            <TextInput style={styles.tinp} onChangeText={setCityname} value={cityName} placeholder='city name' ></TextInput>
            <TextInput style={styles.tinp} onChangeText={setCityCountry} value={cityCountry} placeholder='country' ></TextInput>
        </View>

        <View style={styles.budden}>
            <Button title='add city' onPress={()=>{buttonHandler() }}/>
        </View>

     </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputs:{
        flex:1,
        width:'90%',
    },
    tinp:{
        height:'15%',
        paddingLeft:20,
        borderColor:'#000',
        borderWidth:2,
        fontSize:20,
    },

    budden:{
        width:'100%',
    },
    title:{
        fontSize:24,
    }

});
