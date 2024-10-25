import PhotosUploader from "../PhotosUploader.jsx";
import Features from "../Features.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import {Navigate, useParams} from "react-router-dom";

export default function PlacesFormPage() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [address,setAddress] = useState('');
  const [addedPhotos,setAddedPhotos] = useState([]);
  const [description,setDescription] = useState('');
  const [features,setFeatures] = useState([]);
  const [extraInfo,setExtraInfo] = useState('');
  const [guests,setGuests] = useState(1);
  const [price,setPrice] = useState(0);
  const [redirect,setRedirect] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/'+id).then(response => {
       const {data} = response;
       setTitle(data.title);
       setAddress(data.address);
       setAddedPhotos(data.photos);
       setDescription(data.description);
       setFeatures(data.features);
       setExtraInfo(data.extraInfo);
       setGuests(data.guests);
       setPrice(data.price);
    });
  }, [id]);
  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }
  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }
  function preInput(header,description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title, address, addedPhotos,
      description, features, extraInfo,
      guests, price,
    };
    if (id) {
      // update
      await axios.put('/places', {
        id, ...placeData
      });
      setRedirect(true);
    } else {
      // new place
      await axios.post('/places', placeData);
      setRedirect(true);
    }

  }

  if (redirect) {
    return <Navigate to={'/account/places'} />
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput('Title')}
        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Enter title"/>
        {preInput('Address')}
        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)}placeholder="Enter address"/>
        {preInput('Photos')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput('Description','Enter description')}
        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
        {preInput('Features')}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Features selected={features} onChange={setFeatures} />
        </div>
        {preInput('Extra info')}
        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} placeholder="Enter extra information"/>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Maximum number of guests</h3>
            <input type="number" value={guests}
                   onChange={ev => setGuests(ev.target.value)}/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input type="number" value={price}
                   onChange={ev => setPrice(ev.target.value)}/>
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}