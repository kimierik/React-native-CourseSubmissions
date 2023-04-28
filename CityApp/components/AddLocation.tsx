
import {  Text, View, TextInput, Button} from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

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


    function buttonHandler(){
        const loca={
            name:locationName,
            content:locationContent,
            id:context.getid(),
        }
       //if editing
        if(route.params.replocation!=undefined){
            context.removeLocation(c.id, route.params.replocation.id);
        }

        if (c.locations==undefined){
            const lst:Location[]=[];
            lst.push(loca as Location)
            c.locations = [...lst] 
        }else{
            c.locations.push(loca as Location)
        }



        dbWrapper.ResetDb(context.cities)
    }



    return (
     <View style={styles.container}>
        <Text style={styles.title}>add locations to {route.params.city.name}</Text>
        <View style={styles.inputs}>
            <TextInput style={styles.tinp} onChangeText={setlocationname} value={locationName} placeholder='Location name' ></TextInput>
            <TextInput style={styles.tinp} onChangeText={setLocationContent} value={locationContent} placeholder='what to do at the location' ></TextInput>
        </View>

        <View style={styles.budden}>
            <Button title='add location' onPress={()=>{buttonHandler() }}/>
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
        alignItems:'center',
        justifyContent: 'center',
        fontSize:24,
    }

});
