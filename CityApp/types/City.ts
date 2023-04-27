




type Location={
    name:string;
    content:string;
    id:string;
}


type City={
    name:string;
    country:string;
    locations: undefined | Location[];
    id:string;
}





export {City, Location}
