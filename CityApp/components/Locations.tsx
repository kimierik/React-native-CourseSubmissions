import {  Text, View, Button, ScrollView } from 'react-native';
import RootStackParams from '../types/navigation';
import { StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {City, Location} from '../types/City';
import { useContext, useEffect, useState } from 'react';
import {useIsFocused} from '@react-navigation/native'

import AppContext from '../modules/AppContext';


import LocationElement from './LocationElement';
import { ListStyles } from '../styles/Lists';


type Props=NativeStackScreenProps<RootStackParams,"Locations","what">

export default function Locations({route,navigation}:Props){
    //const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const context = useContext(AppContext)
    const isfocused=useIsFocused();
    const [loclst,setlocations]=useState<Location[]>([]);

    
    
    function getcity():City{//hesus cristus
        
        if(route.params?.city== undefined){
            //city should never be undefined but if it iss this will stop the app from self destructing
            let a:City={id:"errorid",name:"error city",country:"error country",locations:undefined}; 
            return a;
        }else return route.params.city;
    }

    useEffect(()=>{
        if(isfocused){
        //console.log("location focus")
          if(context.findCity(route.params.city.id).locations!=undefined){
              setlocations(context.findCity(route.params.city.id).locations)
          }
        }
    },[isfocused])

    
    function rerender(){
        let cit=context.findCity(route.params.city.id).locations
        cit=[...cit]// unfortunate mem nuke is needed to rerender properly
        setlocations(cit)
    }


    const elements=loclst.map((i)=>
        <LocationElement {...i} key={i.id} fns={{rerender, getcity}} />
    )



    return (
     <View style={ListStyles.container}>
        <Text style={ListStyles.title}>these are the locations of {getcity().name}</Text>


        <ScrollView style={ListStyles.scroll}>
            {elements}
        </ScrollView>

        <View style={ListStyles.budden}>
          <Button
              title='add locations'
              onPress={()=>{navigation.navigate('AddLocation',{city:getcity(),replocation:undefined})}}//navigates to thing with name
          />
        </View>


     </View>
     )
}





