import React, {useState} from 'react'
import {AiOutlineCloudUpload} from "react-icons/ai";
import {MdDelete} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import Spinner from './Spinner';
import {client} from "../utils/client";
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
    const selectedFile = e.target.files[0];
    // uploading asset to sanity
    if(selectedFile.type==='image/png'||selectedFile.type==='image/svg'||selectedFile.type==='image/jpeg'||selectedFile.type==='image/jpg'||selectedFile.type==='image/tiff'){
      setWrongImageType(false);
      setLoading(true);
      client.assets.upload(
        'image', selectedFile,{contentType: selectedFile.type, filename: selectedFile.name}
      ).then((document)=>{
        setImageAsset(document);
        setLoading(false);
      }).catch((error)=>{
        console.log(`upload failed. error:->${error.message}`);
      })
    }else{
      setLoading(false);
      setWrongImageType(true);
    }
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
        {!imageAsset ? (
          <label>
            <div>
              <div>
                <p><AiOutlineCloudUpload/></p>
                <p>Click to upload</p>
              </div>
              <p>Recommendation: Please use high quality image</p>
            </div>
            <input
              type='file'
              name='upload image'
              onChange={uploadImage}
              className=''
            />
          </label>  
        ) : (
          <div>
            <img
              src="https://react-icons.github.io/react-icons/search/#q=AiTwotoneDelete"
              alt="uploaded-pic"
            />
            <button type='button' onClick={()=>{setImageAsset(null)}}>
              <MdDelete/>
            </button>
          </div>
        )}

        <div>
          <input
            type='text'
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder='add your title'
            className=''
          />
          {user && (
            <div>
              <img src={user.image} alt='user-profile'/>
              <p>{user.userName}</p>
            </div>
          )}

          <input
            type='text'
            value={about}
            placeholder='about ...'
            onChange={(e)=>setAbout(e.target.value)}
            className=''

          />

          <input
            type='text'
            placeholder='destination'
            value={destination}
            onChange={(e)=>setDestination(e.target.value)}
            className=''
          />
          <div>
            <p>Choose Your Pin Category</p>
            <select
              onChange={(e)=>{
                setCategory(e.target.value);
              }}
            >
              <option>
                select categories
              </option>
              {categories.map((catg)=>(
                <option>{catg.name}</option>
              ))}
            </select>
          </div>

          <div>
            <button type='button' onClick={savePin} className=''>
                Save Pin
            </button>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default CreatePin