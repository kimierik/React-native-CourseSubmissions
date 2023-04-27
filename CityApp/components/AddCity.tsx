
import {useState} from 'react';
import {  Text, View , TextInput, Button} from 'react-native';


export default function AddCity(){
    const [cityName, setCityname]=useState<string>("lahti");
    const [cityCountry, setCityCountry]=useState<string>("suomi");


    return (
     <View>
        <Text>adds citues</Text>
        <TextInput onChangeText={setCityname} value={cityName} ></TextInput>
        <TextInput onChangeText={setCityCountry} value={cityCountry} ></TextInput>
        <Button title='sumb' onPress={()=>{
            

        }}/>

     </View>
    )
}
