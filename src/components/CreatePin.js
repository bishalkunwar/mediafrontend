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
    if(title && )
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