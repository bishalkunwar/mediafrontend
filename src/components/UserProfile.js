import React, {useState, useEffect} from 'react'
import {AiOutlineLogout} from "react-icons/ai";
import {useParams, useNavigate} from "react-router-dom";
import {GoogleLogout} from "react-google-login";

import {userCreatedPinsQuery, userQuery, userSavedPinsQuery} from "../utils/data";
import {client} from "../utils/client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const activeBtnStyles = "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles = "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none"; 

const UserProfile = () => {
  const[user, setUser] = useState();
  const[pins, setPins] = useState();
  const[text, setText] = useState();
  const[activeBtn, setActiveBtn] = useState();
  const navigate = useNavigate();
  const {userId} = useParams();

  const User = localStorage.getItem("user") !== "undefined" ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  useEffect(()=> {
    const query = userQuery(userId);
    client.fetch(query).then((data)=>{
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(()=>{
    if(text === "created"){
      const userCreatedQuery = userCreatedPinsQuery(userId);
      client.fetch(userCreatedQuery).then((data)=>{
        setPins(data);
      })
    }else{
      // text === "saved" scenario.
      const savedPinsQuery = userSavedPinsQuery(userId);
      client.fetch(savedPinsQuery).then((data)=>{
        setPins(data);
      });
    }
  }, [text, userId]);

  const logout = () =>{
    localStorage.clear();
    navigate('/login');
  };


  // if(!user) return <Spinner message="Loading Profile"/>

  return(
    <div>
      
    </div>
  )
};

export default UserProfile;