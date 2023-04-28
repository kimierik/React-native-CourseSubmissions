import { createContext } from "react";
import { City } from "../types/City";

import { dbWrapper } from "./DbWrapper";



interface thing{
    cities:City[];
    getid():string;
    findCity:Function ;
    removeCity:Function;
    removeLocation:Function;
    updateCities:Function;
}





const defs : thing={
    cities:[],

    /*
    * generates random id
    * */
    getid:()=>{ return Math.random().toString(); },

    
    /*
    * Loads db data to cities array
    * */
    updateCities:async function(){
        const data = await dbWrapper.LoadDB()
        this.cities=data;
    },


    /*
    * returns city ref with id
    * */
    findCity:function(id:string):City|undefined{
        let item=undefined
        this.cities.map((i)=>{

            if(i.id.toString()==id.toString()){
                item=i
            }
        })
        return item;

    },


    /*
    * deletes from db and cities array
    * */
    removeCity:function(id:string){
        this.cities.map((item,index)=>{
            if(id==item.id){
                this.cities.splice(index,1);
                dbWrapper.DeleteSingle(id)
            }
        })
    },


    /*
    * removes location from city
    * */
    removeLocation:function(cityId:string,locationId:string){
        const city =this.findCity(cityId) as City
        if(city?.locations!=undefined){
            city.locations.map((i,index)=>{
                if(locationId==i.id) {
                    city.locations?.splice(index,1)
                    dbWrapper.DeleteSingle(city.id);
                    dbWrapper.storeData(city);
                    }
            })
        }

    },
}


export {defs}

const AppContext=createContext(defs);


export default AppContext;
