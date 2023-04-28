
import {  Text, View, TextInput, Button} from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParams from '../types/navigation';

import { Location } from '../types/City';
import AppContext from '../modules/AppContext';
import {useIsFocused} from '@react-navigation/native'

import { dbWrapper } from '../modules/DbWrapper';


type Props=NativeStackScreenProps<RootStackParams,"AddLocation","what">
export default function AddLocation({route,navigation}:Props){
//this ptrob should have a refrence to the city that the location is being added to so that it goes to the propper place
    const [locationName, setlocationname]=useState<string>("");
    const [locationContent, setLocationContent]=useState<string>("");
    const cit=route.params.city
    const cont=useContext(AppContext);

    const c=cont.findCity(cit.id);//this is recalled

    const context=useContext(AppContext)
    const isfocused=useIsFocused()

    //use effect if this does not work the way i want it to work
    useEffect(()=>{
        if(isfocused){
            if(route.params.replocation!=undefined){
                setlocationname(route.params.replocation.name)
                setLocationContent(route.params.replocation.content)
            }
        }
    },[isfocused])




    return (
     <View>
        <Text>adds citues to {route.params.city.name}</Text>
        <TextInput onChangeText={setlocationname} value={locationName} placeholder='Location name' ></TextInput>
        <TextInput onChangeText={setLocationContent} value={locationContent} placeholder='what to do at the location' ></TextInput>
        <Button title='sumb' onPress={()=>{

        const loca={
            name:locationName,
            content:locationContent,
            id:context.getid(),
        }

        if (c.locations==undefined){
            const lst:Location[]=[];
            lst.push(loca as Location)//wtf is happening
            c.locations = [...lst] //this does not go through 
            //something changes
            console.log(c.locations)
            console.log(c)
            console.log(lst)

        }else{
            c.locations.push(loca as Location)
        }

        dbWrapper.ResetDb(context.cities)
        

            

        }}/>

     </View>
    )
}
