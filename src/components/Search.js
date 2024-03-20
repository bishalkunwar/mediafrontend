import React, {useState, useEffect} from 'react'
import { searchQuery, feedQuery } from '../utils/data'
import { client } from '../utils/client'
import Spinner from './Spinner'
import MasonryLayout from './MasonryLayout'

const Search = ({searchTerm}) => {
  const[pins, setPins] = useState();
  const[loading, setLoading] = useState(false);

  useEffect(()=>{
    if(searchTerm !== ''){
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data)=>{
        setPins(data);
        setLoading(false);
      })

    }else{
      client.fetch(feedQuery).then((data)=>{
        setPins(data);
        setLoading(false);
      })
    }
  }, [searchTerm]);

  return (
    <div>
      {loading &&(<Spinner message="Searching for the Pins"/>)};
      {pins?.length !== 0 && (<MasonryLayout pins={pins}/>)}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className='mt-10 text-center text-xl'>
          No Any Pins Found
        </div>
      )};
    </div>
  )
}

export default Search