import {useEffect, useState} from 'react'
import { ScrollView ,StyleSheet,  View  } from 'react-native';
import { dbWrapper } from './Modules/DbWrapper';

import Entry from './Components/Entry'
import Header from './Components/Header';



export default function App() {
    const [getList,setList] = useState([]);//list of all todo tasks
    const [getText,setText] = useState("");//input text
    
    //this is either No Filter, Show done or show not done
    //this is done with strings so that we can use the same string to display what filter you have selected
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

    /**
    * submits the task that is written to the list
    * */ 
    function submit(){
        if (getText===""){return;}
        let ob=
            {
                content:getText,
                id:generateRandomId().toString(),
                done:false
            };

        setList( [ ...getList, ob ]);
        setText("");

        dbWrapper.storeData(ob);

    }


    /**
     * deletes all objects from the state list with a given id
     * there should only be one in the list but this will delete all 
     * also deletes from the db
     * @param {string} deleteid  -  id to delete
    */
    async function del(deleteid){
        for(var i =getList.length-1;i>=0;i--){
            if ( getList[i].id==deleteid){
                setList([
                    ...getList.slice(0, i),
                    ...getList.slice(i + 1, getList.length)
                ]);
                dbWrapper.DeleteSingle(deleteid);
            }
        }
    }


    /**
     * this gets called when the done is pressed on any entry component
     * @param {} object that was changed
     */
    function donePressed(object){
        dbWrapper.DeleteSingle(object.id);
        dbWrapper.storeData(object);
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
       let r=[]; //returned list init

        if(filtertext==="No Filter"){ 
            return getList;
        }

        //logic
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
      <Entry item={i} key={i.id} fns={{del,donePressed}}  ></Entry>
    )


  return (
    <View style={styles.container} >
        <View style={styles.head}>
            
            <Header fns={{submit,filtertext,getText,setText, incrementFilter}}></Header>

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
});
