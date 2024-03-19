import React, {useState} from 'react'
import {AiOutlineCloudUpload} from "react-icons/ai";
import {MdDelete} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import Spinner from './Spinner';
import client from "../utils/client";
import categories from '../utils/data';


const CreatePin = ({user}) => {

  const[title, setTitle] = useState('');
  const[about, setAbout] = useState('');
  const[destination, setDestination] = useState();
  const[category, setCategory] = useState();
  const [fields, setFields] = useState();
  const [loading, setLoading] = useState(false);
  const[imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);
  const navigate = useNavigate();

  const uploadImage = (e)=> {

  };

  const savePin = () => {
    if(title && about && destination && imageAsset?._id && category){
      const doc = {
        _type: 'pin',
        title,
        about, 
        destination, 
        image: {
          _type: 'image', asset: {_type: 'reference', _ref: imageAsset?._id,},
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy', ref:user._id,
        },
        category,
      };

      client.create(doc).then(()=>{
        navigate('/');
      })
    }else{
      setFields(true);
      setTimeout(()=>{setFields(false);}, 2000);
    }
  };
  return (
    <div className=''>
      <p>Please Add all Fields</p>
      <div>
        {loading && (<Spinner/>)}{wrongImageType && (<p>It&apos;s wrong file type</p>)}
      </div>
    </div>
  )
}

export default CreatePin