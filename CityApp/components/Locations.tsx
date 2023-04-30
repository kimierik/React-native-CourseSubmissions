import {  Text, View, Button, ScrollView } from 'react-native';
import RootStackParams from '../types/navigation';
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
    const [locations,setLocations]=useState<Location[]>([]);

    //safely check if we are given a real city
    function getcity():City{
        if(route.params?.city== undefined){
            //city should never be undefined but if it iss this will stop the app from self destructing
            let a:City={id:"errorid",name:"error city",country:"error country",locations:undefined}; 
            return a;
        }else return route.params.city;
    }


    useEffect(()=>{
        if(isfocused){
            //when focussed set locations to the locations found in the city that was provided in props
            if(context.findCity(route.params.city.id).locations!=undefined){
                setLocations(context.findCity(route.params.city.id).locations)
            }
        }
    },[isfocused])

    
    //re render the component has to be called manually since react does not know that we have updated anything
    function reRender(){
        let cit=context.findCity(route.params.city.id).locations
        cit=[...cit]// unfortunate mem nuke is needed to rerender properly
        setLocations(cit)
    }


    //all location elements
    const elements=locations.map((i)=>
        <LocationElement {...i} key={i.id} fns={{reRender, getcity}} />
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





