import React from 'react'
import { useSelector} from 'react-redux';
import {  selectLogged,selectUserName ,selectUserFirstName} from './LoginSlice';

import 'animate.css';
import YouTube from 'react-youtube';
import {
  WelcomeContainer, 
  WelcomeContent,
  WelcomeImg, 
  WelcomeContentText,
  WelcomeContentTitle,
  WelcomeText,
  
} from '../Styles/Welcome.js';

const About = () => {
  const userName = useSelector(selectUserName)
  const logged1 = useSelector(selectLogged)
  localStorage.getItem("cartItems").length===0 && localStorage.setItem("cartItems", JSON.stringify([]))
  const firstName = useSelector(selectUserFirstName)

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <div> 
       <WelcomeContainer>
                <WelcomeContent>
                    <WelcomeContentText className='animate__animated animate__zoomIn'>
                        <WelcomeContentTitle>Welcome, {logged1===true ? firstName==="" ? userName: firstName: "guest"}</WelcomeContentTitle>
                        <WelcomeText>
                            Watch this video !
                        </WelcomeText>
                        <WelcomeText>
                            Become Jacob's Dreams member and I will give you best Barman tips! 
                        </WelcomeText>
                    </WelcomeContentText>
                    <WelcomeImg>
                    <YouTube  videoId="mkl07PqIx_k" opts={opts}  />
                    </WelcomeImg>
                </WelcomeContent>
                

            </WelcomeContainer>
    </div>
  )
}

export default About