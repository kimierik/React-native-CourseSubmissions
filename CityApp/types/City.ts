




type Location={
    name:string;
    content:string;
}


type City={
    name:string;
    country:string;
    locations: undefined | Location[];
}





export {City, Location}