import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import {MdDownloadForOffline} from "react-icons/md";
import {AiTwotoneDelete} from "react-icons/ai";
import {BsFillArrowUpRightCircleFill} from "react-icons/bs";
import { client, urlFor } from '../utils/client';

const Pin = ({pin}) => {

  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const navigate = useNavigate();
  const{postedBy, image, _id, destination} = pin;

  const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  const deletePin = (id) => {
    client.delete(id).then(()=>{
      window.location.reload();
    });
  };

  const alreadySaved = pin?.save?.filter((item)=> item?.postedBy?._id === user?.googleId);
  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const savePin = (id) => {

  };

  return (
    <div> 
      <img src={urlFor(image).width(250).url()} alt='user-post' className='rounded-lg w-full'/>
    </div>
  )
}

export default Pin