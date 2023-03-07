import {useEffect, useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { ScrollView ,StyleSheet, Text, View ,Button , TextInput, SafeAreaView} from 'react-native';
import Entry from './Components/Entry'
import { dbWrapper } from './Modules/DbWrapper';




/*
   {
   content: the text
   id: unique randomly generated id
   done:bool ; the thing we check if the thing is done or not. this is needed bc this needs to be saved
   thing:im pretty sure there was supposed to be some other filtering thying. that goes here
   } 



   this file needs to be split
   too mutch logic in this one file
   we probably can make it into a module and export it xd



     */

export default function App() {
    const [getList,setList] = useState([]);
    const [getText,setText] = useState("");
    const [filtertext,setFilterText] = useState("No Filter");



    //runs when the app starts. this is used to get all db data
    useEffect(()=>{
        dbWrapper.LoadDB(setList)
    },[])


    /**
    * makes a random id. needed since we are making multiple Entry elements at runtime
    * @returns {number} random number
    * */
    function generateRandomId(){
        return Math.random()*12345
    }

    // submit the task to the list
    function submit(){
        if (getText!==""){
            setList( [ ...getList,
                {
                    content:getText,
                    id:generateRandomId(),
                    done:false
                }
            ]);
                setText("");
            }
    }


    /**
     * deletes all objects from the state list with a given id
     * there should only be one in the list but this will delete all 
     * @param {string} deleteid  -  id to delete
    */
    async function del(deleteid){
        for(var i =getList.length-1;i>=0;i--){
            if ( getList[i].id==deleteid){
                setList([
                    ...getList.slice(0, i),
                    ...getList.slice(i + 1, getList.length)
                ]);
            }
        }
        //await AsyncStorage.removeItem(deleteid);

    }


    //changes filter when pressed. also changes the text
    function incrementFilter(){
        if(filtertext==="No Filter"){
            setFilterText("Show not done")
        }
        if(filtertext==="Show not done"){
            setFilterText("Show done")
        }
        if(filtertext==="Show done"){
            setFilterText("No Filter")
        }
    }



    /**
    * @returns {[]}  list of objects that has been filtered
    * */
    function getFilteredList(){
       let r=[]; 

        if(filtertext==="No Filter"){ 
            return getList;
        }

        if(filtertext==="Show not done"){ 
            for(var i =0;i<getList.length;i++){
                if(getList[i].done==false){
                    r.push(getList[i]);
                }
            }
        }

        if(filtertext==="Show done"){ 
            for(var i =0;i<getList.length;i++){
                if(getList[i].done==true){
                    r.push(getList[i]);
                }
            }
        }

        return r;
    }


    //all Entries
    const elemts=getFilteredList().map((i)=>
      <Entry item={i} key={i.id} delfn={del} ></Entry>
    )


  return (
    <View style={styles.container} >

        <View style={styles.head}>
            <Text>TODO app</Text>

            <View style={styles.Textview}>
                <TextInput placeholder='todo input' maxLength={20} value={getText} onChangeText={setText} style={styles.Textfield} ></TextInput>
            </View>

            <Button title='Add to task list' onPress={()=>{submit()}}> </Button>
            <Button title='save to mem' onPress={()=>{dbWrapper.ResetDb(getList)}}> </Button>
            <Button title={filtertext} onPress={()=>{incrementFilter()}}> </Button>
            <StatusBar style="auto" />


            <ScrollView style={styles.scroll}>
                {elemts}
            </ScrollView>
        </View>
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
    head: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop:100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll:{
        width:200,
    },

    Textview:{
        borderWidth:2,
        width:200,
        borderColor:"#ff0000",
    },
    Textfield:{
        padding:5,
        alignContent:"center",
    }
});
