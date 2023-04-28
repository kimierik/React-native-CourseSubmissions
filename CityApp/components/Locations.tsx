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
        <View key={i.id}>
            <Text>{i.name}</Text>
            <Text>{i.content}</Text>
            <Button
                title='delete'
                onPress={()=>{context.removeLocation(getcity().id, i.id);rerender()}}
            />

            <Button
                title='edit'
                onPress={()=>{
                    context.removeLocation(getcity().id, i.id);
                    rerender();
                    console.log("before addlocaton")
                    navigation.navigate('AddLocation',{city:getcity(),replocation:i})
                    }}
            />

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
              onPress={()=>{navigation.navigate('AddLocation',{city:getcity(),replocation:undefined})}}//navigates to thing with name
          />

     </View>
     )
}
