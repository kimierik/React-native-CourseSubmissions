
import {  Text, View, TextInput, Button} from 'react-native';
import { useContext, useState } from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParams from '../types/navigation';

import { Location } from '../types/City';
import AppContext from '../modules/AppContext';


type Props=NativeStackScreenProps<RootStackParams,"AddLocation","what">
export default function AddLocation({route,navigation}:Props){
//this ptrob should have a refrence to the city that the location is being added to so that it goes to the propper place
    const [locationName, setlocationname]=useState<string>("lahti");
    const [locationContent, setLocationContent]=useState<string>("suomi");
    const cit=route.params.city
    const cont=useContext(AppContext);
    const c=cont.findCity(cont.cities,cit.id);
    console.log(cont.cities)



    return (
     <View>
        <Text>adds citues to {route.params.city.name}</Text>
        <TextInput onChangeText={setlocationname} value={locationName} ></TextInput>
        <TextInput onChangeText={setLocationContent} value={locationContent} ></TextInput>
        <Button title='sumb' onPress={()=>{

        const loca={
            name:locationName,
            content:locationContent
        }
        if (c.locations==undefined){
            const lst:Location[]=[];
            lst.push(loca as Location)//wtf is happening
            c.locations = lst //this does not go through 
            //something changes

            console.log("undefined is")
            console.log(cit.locations)
            console.log(cit)
            console.log(lst)

        }else{
            c.locations.push(loca as Location)

        }

            

        }}/>

     </View>
    )
}
