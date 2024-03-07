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
            <div className='a'>
                <div className='b'>
                    <video
                        src={shareVideo}
                        type="video/mp4"
                        loop
                        controls={false}
                        muted
                        autoPlay
                        className=''
                    />

                    <div className='c'>
                        <div className='c-a'>
                            <img src={logo} alt="logoimage"/>
                        </div>

                        <div className='d'>
                            <GoogleLogin
                            clientId="967909129849-6ab1gv306flblg0iuaij24t1vafei66k.apps.googleusercontent.com"
                            render = {(renderProps)=> (
                                <button
                                    type='button'
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    className=''
                                >
                                    <FcGoogle/> 
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