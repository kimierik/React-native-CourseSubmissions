import {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { ScrollView ,StyleSheet, Text, View ,Button , TextInput} from 'react-native';
import Entry from './Components/Entry'
export default function App() {
    const [getList,setList] = useState([]);
		const [getText,setText] = useState("input");

		function submit(){
      setList([...getList,{content:getText,ind:getList.length}]);
		}

    function del(delind){
      setList([
        ...getList.slice(0, delind),
        ...getList.slice(delind + 1, getList.length)
      ]);
    }

   const elemts=getList.map((i)=>
   //mutliple have same key from thing
    //consider if this is the one that is submitted or not
      <Entry item={i.content} key={i.ind} delfn={del} ind={i.ind}></Entry>
   )


  return (
    <View style={styles.container}>
      <Text>TODO app</Text>

        <TextInput value={getText} onChangeText={setText}></TextInput>
      <Button title='asd' onPress={()=>{submit()}}> </Button>
      <StatusBar style="auto" />
      <ScrollView>
        {elemts}
      </ScrollView>
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
