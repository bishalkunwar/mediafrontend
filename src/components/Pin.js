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

  let alreadySaved = pin?.save?.filter((item)=> item?.postedBy?._id === user?.googleId);
  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const savePin = (id) => {
    if(alreadySaved?.length === 0){
      setSavingPost(true);

      client.patch(id).setIfMissing({save: []}).insert('after', 'save[-1]', [{
        _key: uuidv4(),
        userId: user?.googleId,
        postedBy: {
          _type: 'postedBy',
          _ref: user?.googleId,
        },
      }]).commit().then(()=>{
        window.location.reload();
        setSavingPost(false);
      });
    }
  };

  return (
    <div className='m-2'>
      <div className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
        onMouseEnter={()=>setPostHovered(true)}
        onMouseLeave={()=>setPostHovered(false)}
        onClick={()=>navigate(`/pin-details/${_id}`)}
      >
        {image && (
          <img src={(urlFor(image).width(250).url())} alt='user-post' className='w-full rounded-lg'/>
        )}{postHovered && (
          <div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50' style={{height:'100%'}}>
            <div>
              <div>
                <a>
                  <MdDownloadForOffline/>
                </a>
              </div>
              {alreadySaved?.length !== 0 ? (
                <button type='button'>
                  {pin?.save?.length} Saved
                </button>
              ) : (
                <button type='button'>
                  {pin?.save?.length}{savingPost?'Saving':'Save'}
                </button>
              )}
            </div>
            
            <div>
              
            </div>

          </div>
        )}
      </div> 
      
    </div>
  )
}

export default Pin