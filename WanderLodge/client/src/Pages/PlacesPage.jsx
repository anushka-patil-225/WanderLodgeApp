import { Link} from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect,useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function PlacesPage(){
    const [places,setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/user-places').then(({data}) => {
        setPlaces(data);
        });
    },[]);

    return (
        <div>
            <AccountNav/>
                <div className="text-left ">
                    <div className="text-center text-xl underline">
                    <b>List of all added places</b>
                    </div>
                    
                    <br/>
                
                <div className="text-center">
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 mt-3 rounded-full" to={'new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add New PLace
                </Link>
                </div> 
                <div className="mt-8 space-y-4">
                    {places.length > 0 && places.map(place => (
                        <Link to={'/account/places/'+place._id} className="flex cursor-pointer gap-4 items-center bg-gray-200 p-4 rounded-2xl">
                            <div className="w-40 h-40 bg-gray-300 flex-shrink-0 overflow-hidden rounded-xl">
                                <PlaceImg place={place} className="w-full h-full object-cover"/>
                            </div>
                            <div className="grow-0 shrink">
                                <h2 className="text-xl">{place.title}</h2>
                                <h3 className="underline italic">{place.address}</h3>
                                <p className="text-sm mt-2">{place.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}


//