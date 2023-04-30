import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';


import InputForm from './Components/InputForm';
import Header from './Components/Header';
import ShoppingItem from './Components/ShoppingItem';


type Item={
    name:String;
    quantity:number;
}


const data=[
    {name:"item",quantity:4},
    {name:"asdfölkj",quantity:6},
    {name:"löakdjg",quantity:8},
]


export default function App() {
  return (
    <View style={styles.container}>
        <Header></Header>
        <InputForm></InputForm>
        <FlatList
            data={data}
            renderItem={({item})=>(
                <ShoppingItem {...item}></ShoppingItem>
            )}
        ></FlatList>
        


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
