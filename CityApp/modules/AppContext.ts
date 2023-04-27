import { createContext, useContext, useState } from "react";
import { City } from "../types/City";

import { Location } from "../types/City";

interface thing{
    cities:City[];
    getid():string;
    findCity:Function ;
    removeCity:Function;
    removeLocation:Function;
}





const defs : thing={
    cities:[],
    getid:()=>{ return Math.random().toString(); },

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
            }
        })
    },


    removeLocation:function(cityId:string,locationId:string){
        const city =this.findCity(cityId) as City
        if(city?.locations!=undefined){
            city.locations.map((i,index)=>{
                if(locationId==i.id) {
                    city.locations?.splice(index,1)
                }
            })
        }

    },
}


export {defs}

const AppContext=createContext(defs);




export default AppContext;
