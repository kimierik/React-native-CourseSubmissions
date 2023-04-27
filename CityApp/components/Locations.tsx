import {  Text, View, Button, ScrollView } from 'react-native';
import RootStackParams from '../types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {City, Location} from '../types/City';
import { useContext, useEffect, useState } from 'react';
import {useIsFocused} from '@react-navigation/native'

import AppContext from '../modules/AppContext';

type Props=NativeStackScreenProps<RootStackParams,"Locations","what">

export default function Locations({route,navigation}:Props){
    //const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const context = useContext(AppContext)
    const isfocused=useIsFocused();
    const [loclst,setlocations]=useState<Location[]>([]);

    
    
    function getcity():City{//hesus cristus
        if(route.params?.city== undefined){
            let a:City={id:"errorid",name:"error city",country:"error country",locations:undefined}; //debug
            return a;
        }else return route.params.city;
    }

    useEffect(()=>{
        if(isfocused){
        console.log("location focus")
          if(context.findCity(route.params.city.id).locations!=undefined){

          setlocations(context.findCity(route.params.city.id).locations)
          }
        }
    },[isfocused])



    const elements=loclst.map((i)=>
    <View key={i.id}>
        <Text>{i.name}</Text>
        <Text>{i.content}</Text>
    </View>
    )

    return (
     <View>
        <Text>this is locations of {getcity().name}</Text>


        <ScrollView>
            {elements}
        </ScrollView>


          <Button
              title='add locations to'
              onPress={()=>{navigation.navigate('AddLocation',{city:getcity()})}}//navigates to thing with name
          />

     </View>
     )
}
