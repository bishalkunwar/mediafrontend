import { useState, useEffect, useRef } from "react";
import {HiMenu} from "react-icons/hi";
import {AiFillCloseCircle} from "react-icons/ai";
import {Link, Route, Routes} from "react-router-dom";

import Sidebar from "../components/Sidebar";
import { userQuery } from "../utils/data";
import {client} from "../utils/client";
import Pins from "./Pins";
import UserProfile from "../components/UserProfile";
import Logo from "../assets/logo.png";

const Home = () => {

    const[toggleSidebar, setToggleSidebar] = useState(false);
    const[user, setUser] = useState();
    const scrollRef = useRef(null);    

    const handleHiMenuClick = () => {
        setToggleSidebar(!toggleSidebar);
    };

    const handleCloseMenu = () => {
        setToggleSidebar(false);
    };

    useEffect(()=>{
        if(scrollRef.current){
            scrollRef.current.scrollTo(0,0);
        }
    }, []);

    const userInfo = localStorage.getItem('user')!=='undefined'?JSON.parse(localStorage.getItem('user')):localStorage.clear();

    useEffect(() => {
        if (userInfo?.googleId) {
            const query = userQuery(userInfo?.googleId);
            client.fetch(query)
                .then((data) => {
                    setUser(data[0]);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [userInfo?.googleId]);

    return(
        <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
           <div className="hidden md:flex h-screen flex-initial">
                <Sidebar user={user&&user}/>
           </div>
           <div className="flex md:hidden flex-row">
                <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
                    <HiMenu fontSize={40} className="cursor-pointer" onClick={handleHiMenuClick}/>
                    <Link to="/">
                        <img src={Logo} alt="logo" className="w-28"/>
                    </Link>
                    <Link to={`user-profile/${user?._id}`}>
                        <img src={user?.image} alt="user-profile" className="w-9 h-9 rounded-full"/>
                    </Link>
                </div>
                { toggleSidebar && (
                    <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z=10">
                        <div className="absolute w-full flex justify-end items-center p-2">
                            <AiFillCloseCircle onClick={handleCloseMenu}/>
                        </div>
                        <Sidebar closeToggle={setToggleSidebar} user={user && user}/>
                    </div>
                )}
           </div>
           <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
            <Routes>
                <Route path="/user-profile/:userId" element={<UserProfile/>}/>
                <Route path="/*" element={<Pins user={user&&user}/>}/>
            </Routes>
           </div>
        </div>
    );
};

export default Home;