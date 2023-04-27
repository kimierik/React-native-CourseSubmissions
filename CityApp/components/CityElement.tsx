
import {  Text, View , ScrollView, Button} from 'react-native';
import {City} from '../types/City';
import RootStackParams from '../types/navigation';

import { Location } from '../types/City';

import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation} from '@react-navigation/native';


//is the city elemnent in home that you can press to open cities
export default function CityElement(params:City){
    

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();


    function getlocsa():Location[]{//hesus cristus
        if(params.locations == undefined){
            let a:Location[]=[];
            return a;
        }else return params.locations;
    }




    return (
     <View>
        <Text>{params.name}</Text>
        <Text>{params.country}</Text>
          <Button
              title='gotoscre'
              onPress={()=>{navigation.navigate('Locations',{city:(params)})}}//navigates to thing with name
          />

     </View>
    )
}
