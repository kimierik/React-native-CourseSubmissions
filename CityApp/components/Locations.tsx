import {  Text, View, Button, ScrollView } from 'react-native';
import RootStackParams from '../types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {Location} from '../types/City';


type Props=NativeStackScreenProps<RootStackParams,"Locations","what">

export default function Locations({route,navigation}:Props){
    //const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const lst=route.params?.locs;

    const elements=lst?.map((i)=>
    <View>
        <Text>{i.name}</Text>
        <Text>{i.content}</Text>
    </View>
    )

    return (
     <View>
        <ScrollView>
            {elements}
        </ScrollView>


          <Button
              title='gotoscre'
              onPress={()=>{navigation.navigate('AddLocation')}}//navigates to thing with name
          />

     </View>
     )
}
