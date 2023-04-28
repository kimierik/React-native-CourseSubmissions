import { createContext, useContext, useState } from "react";
import { City } from "../types/City";

import { Location } from "../types/City";
import { dbWrapper } from "./DbWrapper";



interface thing{
    cities:City[];
    getid():string;
    findCity:Function ;
    removeCity:Function;
    removeLocation:Function;
    updateCities:Function;
}





//db interaction
//editing. deletes the current one and overrides it with the new one
//edit location just deletes it and moves you to add locations screen i quess
// allthough we should populate name and things with the things we have
const defs : thing={
    cities:[],
    //helper
    getid:()=>{ return Math.random().toString(); },

    
    updateCities:async function(){
        const data = await dbWrapper.LoadDB()
        this.cities=data;
    },

    findCity:function(id:string):City|undefined{
        let item=undefined
        this.cities.map((i)=>{

            if(i.id.toString()==id.toString()){
                item=i
            }
        })
        return item;

    },

    removeCity:function(id:string){
        this.cities.map((item,index)=>{
            if(id==item.id){
                this.cities.splice(index,1);
                dbWrapper.DeleteSingle(id)
            }
        })
    },


    removeLocation:function(cityId:string,locationId:string){
        const city =this.findCity(cityId) as City
        if(city?.locations!=undefined){
            city.locations.map((i,index)=>{
                if(locationId==i.id) {
                    city.locations?.splice(index,1)
                    //do something to dbwrapper
                    //relete the city and reup it i think
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
