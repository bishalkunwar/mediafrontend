import { useState, useEffect, useRef } from "react";
import {HiMenu} from "react-icons/hi";
import {AiFillCloseCircle} from "react-icons/ai";

const Home = () => {

    const[toggleSidebar, setToggleSidebar] = useState(false);
    
    const handleHiMenuClick = () => {
        setToggleSidebar(!toggleSidebar);
    };

    const handleCloseMenu = () => {
        setToggleSidebar(false);
    };

    return(
        <div className="home-container">
            
            <div className="nav-container"> 
                <div className="nav-elements">
                    <HiMenu />
                </div>
            </div>
        </div>
    );
};

export default Home;