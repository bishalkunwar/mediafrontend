import React from 'react'
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import {FcGoogle} from "react-icons/fc";
import shareVideo from "../assets/share.mp4"
import logo from "../assets/logo.png";
import {useNavigate} from "react-router-dom";
import {client} from "../utils/client";
import {jwtDecode} from "jwt-decode";

const Login = () => {
    const navigate = useNavigate();

    const responseGoogle = (response) => {
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response.profileObj));
        var decodedHeader = jwtDecode(response.credential);
        const {name, imageUrl} = decodedHeader;
        const googleId = decodedHeader.sub;

        const doc = {
            _id: googleId,
            _type: "user",
            userName: name,
            image: imageUrl
        };

        if(!doc._id){
            console.log("No id found in decodeHeader");
            return;
        };

        client.createIfNotExists(doc).then(()=>{
            navigate("/", {replace: true})
        });
    };

    return (
        <GoogleOAuthProvider clientId='967909129849-6ab1gv306flblg0iuaij24t1vafei66k.apps.googleusercontent.com'>
            <div className="flex justify-start items-center flex-col h-screen">
                <div className="relative w-full h-full">
                    <video
                        src={shareVideo}
                        type="video/mp4"
                        loop
                        controls={false}
                        muted
                        autoPlay
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                        <div className='p-5'>
                            <img src={logo} alt="logoimage" width="130px"/>
                        </div>

                        <div className='shadow-2xl'>
                            <GoogleLogin
                            clientId="967909129849-6ab1gv306flblg0iuaij24t1vafei66k.apps.googleusercontent.com"
                            render = {(renderProps)=> (
                                <button
                                    type='button'
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    className='bg-mainColor flex items-center p-3 rounded-lg cursor-pointer outline-none'
                                >
                                    <FcGoogle className='mr-4'/> 
                                    Sign in with Google
                                </button>
                            )}
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy="single_host_origin"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </GoogleOAuthProvider>
  )
}

export default Login