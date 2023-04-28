
import {  Text, View , Button} from 'react-native';
import RootStackParams from '../types/navigation';
import {  NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppContext from '../modules/AppContext';

import { useContext} from 'react';
import {  useNavigation} from '@react-navigation/native';
//is the city elemnent in home that you can press to open cities

import { ElementStyles } from '../styles/Elements';


type locationparam={
    name:string;
    content:string;
    id:string;
    fns:{reRender:Function,getcity:Function}
}

export default function LocationElement(params:locationparam){

    const context=useContext(AppContext)

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const {name,content,id}=params



    return (
        <View key={params.id} style={ElementStyles.container}>
            <View style={ElementStyles.innerConteinaer}>

                <View style={ElementStyles.txt}> 
                    <Text style={ElementStyles.name}>{params.name}</Text>
                    <Text>{params.content}</Text>
                </View>
                <View style={ElementStyles.buttons}>

                    <Button
                        title='edit'
                        onPress={()=>{
                                params.fns.reRender();
                                navigation.navigate('AddLocation',{city:params.fns.getcity(),replocation:{name,content,id}})
                            }}
                    />
                    <Button
                        title='delete'
                        color={'red'}
                        onPress={()=>{
                            context.removeLocation(params.fns.getcity().id, params.id);
                            params.fns.reRender()
                        }}
                    />
                </View>

            </View>
        </View>
    )
}



