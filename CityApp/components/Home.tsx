import {  Text, View, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation} from '@react-navigation/native';
import RootStackParams from '../types/navigation';
import { ScrollView } from 'react-native';
import CityElement from './CityElement';
import { useEffect, useState } from 'react';
import { City } from '../types/City';
import { useContext } from 'react';

import AppContext from '../modules/AppContext';

import { SafeAreaView } from 'react-native';

import {useIsFocused} from '@react-navigation/native'
import { dbWrapper } from '../modules/DbWrapper';
import { ListStyles } from '../styles/Lists';







//has list of cities and button to add cities
export default function Home(){
    const [cities, setCities] = useState<City[]>([])
    const isfocused= useIsFocused()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const context=useContext(AppContext)
    //do we do hook. update hook on 


    //loads data from db and set it to the screen
    async function setdata(){
        const data=await dbWrapper.LoadDB();
        context.updateCities()
        setCities(data)
    }


    //whe we focus we load data from the database
    useEffect(()=>{
        if(isfocused){
            setdata()
        }
    },[isfocused])


    //re render cities
    function reRender(){
        context.cities=[...context.cities]// unfortunate mem nuke is needed to rerender properly
        setCities(context.cities as City[]) 
    }

    //all city elements
    const elements = cities.map((i)=>
        <CityElement {...i} key={context.getid()} fns={{reRender}} ></CityElement>
    )


    return (
     <SafeAreaView style={ListStyles.container}>
         <Text style={ListStyles.title}>List of cities around the world</Text>


        <ScrollView style={ListStyles.scroll }>
                {elements}
        </ScrollView>

        <View style={ListStyles.budden}>

          <Button
              title='add Cities'
              onPress={()=>{navigation.navigate('AddCity')}}//navigates to thing with name
          />
        </View>
        
     </SafeAreaView>

    )
}


