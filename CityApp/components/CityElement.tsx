
import { Text, View ,  Button, TouchableHighlight} from 'react-native';
import RootStackParams from '../types/navigation';
import { Location } from '../types/City';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation} from '@react-navigation/native';
import { ElementStyles } from '../styles/Elements';

import { useContext, useState } from 'react';
import AppContext from '../modules/AppContext';

//is the city elemnent in home that you can press to open cities

type Cityparam={
    name:string;
    country:string;
    locations: undefined | Location[];
    id:string;
    fns:{reRender:Function}
}

export default function CityElement(params:Cityparam){
    const [cname,setname] = useState(params.name)
    const {name,country,locations,id}=params
    const context=useContext(AppContext)
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();



    return (
     <View style={ElementStyles.container}>
        <View style={ElementStyles.innerConteinaer}>

            <TouchableHighlight style={ElementStyles.txt} onPress={()=>{
                navigation.navigate('Locations',{city:({name,country,locations,id})})

            }}>

            <View style={ElementStyles.txt} >
                <Text style={ElementStyles.name}>{cname}</Text>
                <Text>{params.country}</Text>
            </View>
            </TouchableHighlight>

            <View style={ElementStyles.buttons}>
                <Button
                    title='edit'
                    onPress={()=>{
                        navigation.navigate('AddCity',{repCity:{name,country,locations,id} })
                        }}
                />

                <Button
                    color={'red'}
                    title='delete'
                    onPress={()=>{
                        context.removeCity(params.id);
                        setname("deleted");
                        params.fns.reRender();
                    }}
                />

            </View>

        </View>
     </View>
    )
}



