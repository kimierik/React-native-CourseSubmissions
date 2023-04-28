
import { City, Location } from "./City";


// these are the paraeters that each thing wants
// ex if it was Comp: {number} then the component Comp would want a number as paramater
type RootStackParams={
    Second:undefined;
    Home:undefined;
    AddCity:undefined|{repCity:City};
    AddLocation:{city:City, replocation:Location |undefined};
    Info:undefined;
    Locations:{city:City};// location data
}


export default RootStackParams;
