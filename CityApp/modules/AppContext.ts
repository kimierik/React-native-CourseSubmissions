import { createContext } from "react";
import CityElement from "../components/CityElement";
import { City } from "../types/City";
import { Location } from "../types/City";

interface thing{
    cities:City[];
    getid():string;
    findCity:Function ;
}

function findCity(citylist:City[],id:string):City|undefined{
    let item=undefined
    citylist.map((i)=>{
        if(i.id.toString()==id.toString()){
            item=i
        }
    })
    return item;
}




const defs : thing={
    cities:[],
    getid:()=>{ return Math.random().toString(); },
    findCity:findCity,
}


export {defs}

const AppContext=createContext(defs);



export default AppContext;
