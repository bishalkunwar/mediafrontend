import React, {useState, useEffect, useCallback} from 'react'
import {MdDownloadForOffline} from "react-icons/md";
import {Link, useParams} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import {BsFillArrowUpRightCircleFill} from "react-icons/bs";
import {client, urlFor} from "../utils/client";
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import Spinner from './Spinner';

const PinDetails = ({user}) => {
  const{pinId} = useParams();
  const[pins, setPins] = useState();
  const[pinDetail, setPinDetail] = useState();
  const[comment, setComment] = useState('');
  const[addingComment, setAddingComment] = useState();
  
  const fetchPinDetails = useCallback(() => {
    const query = pinDetailQuery(pinId);

    if(query) {
        client.fetch(`${query}`).then((data) => {
            setPinDetail(data[0]);
            console.log(data);
            if(data[0]) {
                const query1 = pinDetailMorePinQuery(data[0]);
                client.fetch(query1).then((res) => {
                    setPins(res);
                });
            }
        });
      }else{
        console.log("no pins")
      }
    }, [pinId]);

    useEffect(() => {
        fetchPinDetails();
    }, [fetchPinDetails]);


  const addComment = () => {
    if(comment){
      setAddingComment(true);

      client.patch(pinId).setIfMissing({comments: []})
      .insert('after', 'comments[-1]', [{comment, _key: uuidv4(), postedBy: {_type: 'postedBy', _ref: user?._id}}])
      .commit()
      .then(()=>{
        fetchPinDetails();
        setComment('');
        setAddingComment(false);
      })
    }
  };

  if(!pinDetail){
    return(
      <Spinner message="No Pin Detail"/>
    )
  }

  return (
   <>
    {pinDetail && (
      <div className='flex xl:flex-row flex-col m-auto bg-white' style={{maxWidth: '1500px', borderRadius: '32px'}}>
        <div className='flex justify-start items-center md:items-start flex-initial'>
        <img
              className="rounded-t-3xl rounded-b-lg "
              src={(pinDetail?.image && urlFor(pinDetail?.image).url())}
              alt="user-post"
            />
        </div>
        <div className='w-full p-5 flex-1 xl:min-2-620'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
              <a 
                download
                href={`${pinDetail?.image?.asset?.url}?dl=`}
                className='bg-secondaryColor p-2 text-xl rounded-full flex items-ccenter justify-center text-dark opacity-75 hover:opacity-100 hover:cursor-pointer'
                >
                <MdDownloadForOffline/>
              </a>
            </div>
            {/* <a href={pinDetail.destination} target="_blank" rel="noreferrer">
                {pinDetail?.destination?.slice(8)}
            </a> */}
            {pinDetail?.destination?.slice(8).length > 0 ? (
                <a href={pinDetail?.destination} target='_blank' rel='noreferrer' className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'>
                  {' '}
                  <BsFillArrowUpRightCircleFill/>
                  {pinDetail?.destination?.slice(8,17)}...
                </a>
              ):undefined}
          </div>
          <div>
            <h1 className='text-4xl font-bold break-words mt-3'>
              {pinDetail.title}
            </h1>
            <p className='mt-3'>{pinDetail.about}</p>
          </div>
          <Link to={`/user-profile/${pinDetail?.postedBy?._id}`} className='flex gap-2 mt-5 items-center bg-white rounded-lg'>
            <img src={pinDetail?.postedBy?.image} alt='user-profile' className='w-10 h-10 rounded-full'/>
            <p className='font-bold'>{pinDetail?.postedBy?.userName}</p>
          </Link>
          <h2 className='mt-5 text-2xl'>Comments</h2>
          <div className='max-h-370 overflow-y-auto'>
            {pinDetail?.comments?.map((cmt)=>(
              <div key={cmt.comment} className='flex gap-2 mt-3 items-center bg-white rounded-lg '>
                <img src={cmt.postedBy?.image} alt="commented-user" className='w-10 h-10 rounded-full'/>
                <div className='flex flex-col'>
                  <p className='font-bold'>{cmt.postedBy?.userName}</p>
                  <p>{cmt.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex flex-wrap mt-6 gap-3'>
            <Link to={`/user-profile/${user?._id}`}>
              <img src={user?.image} alt='user-profile' className='w-10 h-10 rounded-full cursor-pointer'/>
            </Link>
            <input
              type='text'
              placeholder='add a comment'
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
              className='flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300'
            />
            <button type='button' onClick={addComment} className='bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none'>
                {addingComment ? 'Adding' : 'Post'}
            </button>
          </div>
        </div>
      </div>
  )}
  {pins?.length > 0 &&(
    <h2 className="text-center font-bold text-2xl mt-8 mb-4">
      More Like This?..
    </h2>
  )}

  {pins ? (
    <MasonryLayout pins={pins}/>
  ) : (
    <Spinner message="loading more pins.."/>
  )}
  </>
  
  )
}

export default PinDetails





// import {useState, useEffect, useCallback} from "react";
// import {MdDownloadForOffline} from "react-icons/md";
// import {Link, useParams} from "react-router-dom";
// import {v4 as uuidv4} from "uuid";

// import {client, urlFor} from "../utils/client";
// import MasonaryLayout from "../components/MasonryLayout";
// import {pinDetailQuery, pinDetailMorePinQuery} from "../utils/data";
// import Spinner from "./Spinner";

// const PinDetails = ({user}) => {

//     const {pinId} = useParams();
//     const[pins, setPins] = useState();
//     const[pinDetail, setPinDetail] = useState();
//     const[comment, setComment] = useState('')
//     const[addingComment, setAddingComment] = useState(false);

//     // const fetchPinDetails =() => {
//     //     const query = pinDetailQuery(pinId);

//     //     if(query){
//     //         client.fetch(`${query}`).then((data)=>{
//     //             setPinDetail(data[0]);
//     //             console.log(data);
//     //             if(data[0]){
//     //                 const query1 = pinDetailMorePinQuery(data[0]);
//     //                 client.fetch(query1).then((res)=>{
//     //                     setPins(res);
//     //                 });
//     //             }
//     //         });
//     //     }
//     // };

//     // useEffect(()=>{
//     //     fetchPinDetails();
//     // }, [pinId])


//     const fetchPinDetails = useCallback(() => {
//         const query = pinDetailQuery(pinId);

//         if(query) {
//             client.fetch(`${query}`).then((data) => {
//                 setPinDetail(data[0]);
//                 console.log(data);
//                 if(data[0]) {
//                     const query1 = pinDetailMorePinQuery(data[0]);
//                     client.fetch(query1).then((res) => {
//                         setPins(res);
//                     });
//                 }
//             });
//         }
//     }, [pinId]);

//     useEffect(() => {
//         fetchPinDetails();
//     }, [fetchPinDetails]);
    

//     const addComment = () => {
//         if(comment){
//             setAddingComment(true);

//             client.patch(pinId)
//                 .setIfMissing({comments: []})
//                 .insert('after', 'comments[-1]', [{comment, _key:uuidv4(), postedBy: {_type: 'postedBy', _ref: user._id}}])
//                 .commit()
//                 .then(()=>{
//                     fetchPinDetails();
//                     setComment('');
//                     setAddingComment(false);
//                 });
//         }
//     };

//     if(!pinDetail){
//         return(
//             <Spinner message="Showing Pins, wait!"/>
//         )
//     }

//     return (
//         <>
//             {pinDetail&& (
//             <div className="flex xl:flex-row flex-col m-auto bg-white" style={{maxWidth: '1500px', borderRadius: '32px'}}>
//                 <div className="flex justify-center items-center md:items-start flex-initial">
//                     <img src={(pinDetail?.image && urlFor(pinDetail?.image).url())} alt="user-post" className="rounded-t-3xl rounded-b-lg"/>
//                 </div>
//                 <div className="w-full p-5 flex-1 xl:min-w-620">
//                     <div className="flex items-center justify-between">
//                         <div className="flex gap-2 items-center">
//                             <a href={`${pinDetail.image.assset.url}?dl=`} download className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100">
//                                 <MdDownloadForOffline/>
//                             </a>
//                         </div>
//                         <a href={pinDetail.destination} target="_blank" rel="noreferrer">
//                             {pinDetail.destination?.slice(8)}
//                         </a> 
//                     </div>
//                     <div>
//                         <h1 className="text-4xl font-bold break-words mt-3">
//                             {pinDetail.title}
//                         </h1>
//                         <p className="mt-3">{pinDetail.about}</p>
//                     </div>
//                     <Link to={`/user-profile/${pinDetail?.postedBy._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg">
//                         <img src={pinDetail?.postedBy.image} className="w-10 h-10 rounded-full" alt="user-profile"/>
//                         <p>{pinDetail?.postedBy.userName}</p>
//                     </Link>
//                     <h2 className="mt-5 text-2xl">Comments</h2>
//                     <div className="max-h-370 overflow-y-auto">
//                         {pinDetail?.comments.map((cmt)=>(
//                             <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={cmt.comment}>
//                                 <img
//                                     src={cmt.postedBy?.image}
//                                     alt="user-profile"
//                                     className="w-10 h-10 rounded-full cursor-pointer"
//                                 />
//                                 <div className="flex flex-col">
//                                     <p className="font-bold">{cmt.postedBy?.userName}</p>
//                                     <p>{cmt.comment}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="flex flex-wrap mt-6 gap-3">
//                         <Link to={`/user-profile/${user._id}`}>
//                         <img src={user.image} alt="user-profile" className="w-10 h-10 rounded-full cursor-pointer"/> 
//                         </Link>
//                         <input
//                             type="text" placeholder="Add a Comment" value={comment}
//                             onChange={(e)=>setComment(e.target.value)}
//                         />
//                         <button type="button" onClick={addComment} className="br-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none">
//                             {addingComment ? 'Posting...' : 'Done'}
//                         </button>
//                     </div>
//                 </div>
//             </div> )}

//             {pins?.length > 0 &&(
//                 <h2 className="text-center font-bold text-2xl mt-8 mb-4">
//                     More like this!!!
//                 </h2>
//             )}

//             {pins ? (<MasonaryLayout pins={pins}/>) : <Spinner message="Loading , more pins!"/>}

//         </>

//     );
// };

// export default PinDetails;