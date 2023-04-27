
import {  Text, View, TextInput, Button} from 'react-native';
import { useState } from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParams from '../types/navigation';

import { Location } from '../types/City';


type Props=NativeStackScreenProps<RootStackParams,"AddLocation","what">
export default function AddLocation({route,navigation}:Props){
//this ptrob should have a refrence to the city that the location is being added to so that it goes to the propper place
    const [cityName, setCityname]=useState<string>("lahti");
    const [cityCountry, setCityCountry]=useState<string>("suomi");
    const cit=route.params.city
    //i really fucking hope this is not a copy but the actual thing


    return (
     <View>
        <Text>adds citues</Text>
        <TextInput onChangeText={setCityname} value={cityName} ></TextInput>
        <TextInput onChangeText={setCityCountry} value={cityCountry} ></TextInput>
        <Button title='sumb' onPress={()=>{
        const loca={
            name:cityName,
            content:cityCountry
        }
        if (cit.locations==undefined){
            const lst:Location[]=[];
            lst.push(loca as Location)//wtf is happening
            cit["locations"]= lst //this does not go through asdfasdklöjaslökdfj

            //if this does not work then we are going to need to drill this one  up or use the usecontext            
            //and use id to determine what city we are adding to
            //cities need id

            //if copy then something would have happened i think
            //is this a jsism or a ts ism or is this not how i imagined it working
            console.log("undefined is")
            console.log(cit.locations)
            console.log(cit)
            console.log(lst)

        }else{
            cit.locations.push(loca as Location)

        }

            

        }}/>

     </View>
    )
}
