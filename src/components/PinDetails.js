import React, {useState, useEffect} from 'react'
import {MdDownloadForOffline} from "react-icons/md";
import {Link, useParams} from "react-router-dom";
import {v4 as uuidv4} from "uuid";

import {client, urlFor} from "../utils/client";
import MasonryLayout from './MasonryLayout';
import { pinDetailMoreQuery, pinDetailQuery } from '../utils/data';
import Spinner from './Spinner';

const PinDetails = ({user}) => {
  const{pinId} = useParams();
  const[pins, setPins] = useState();
  const[pinDetail, setPinDetail] = useState();
  const[comment, setComment] = useState('');
  const[addingComment, setAddingComment] = useState();
  
  return (
    <div>PinDetails</div>
  )
}

export default PinDetails