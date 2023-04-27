import {  Text, View, Button, ScrollView } from 'react-native';
import RootStackParams from '../types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {City, Location} from '../types/City';


type Props=NativeStackScreenProps<RootStackParams,"Locations","what">

export default function Locations({route,navigation}:Props){
    //const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

    function location_lst():Location[]{
        if(route.params?.city.locations== undefined){
            const a:Location[] =[];
            return a;
        }else return route.params.city.locations;
    }

    
    function getcity():City{//hesus cristus
        if(route.params?.city== undefined){
            let a:City={id:"errorid",name:"error city",country:"error country",locations:undefined}; //debug
            return a;
        }else return route.params.city;
    }


    const elements=location_lst().map((i)=>
    <View>
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
