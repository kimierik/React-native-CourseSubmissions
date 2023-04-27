
import {useContext, useState} from 'react';
import {  Text, View , TextInput, Button} from 'react-native';
import AppContext from '../modules/AppContext';
import {City} from '../types/City';

export default function AddCity(){
    const [cityName, setCityname]=useState<string>("lahti");
    const [cityCountry, setCityCountry]=useState<string>("suomi");
    const asdf =useContext(AppContext)


    return (
     <View>
        <Text>adds citues</Text>
        <TextInput onChangeText={setCityname} value={cityName} ></TextInput>
        <TextInput onChangeText={setCityCountry} value={cityCountry} ></TextInput>
        <Button title='sumb' onPress={()=>{
        const cit={
            name:cityName,
            country:cityCountry,
            locations:undefined,
            id:asdf.getid()
        }
        asdf.cities.push(cit as City)

            

        }}/>

     </View>
    )
}
