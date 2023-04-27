import { createContext } from "react";
import { City } from "../types/City";

interface thing{
    cities:City[];
}

const defs : thing={
    cities:[],
}


const AppContext=createContext(defs);



export default AppContext;
