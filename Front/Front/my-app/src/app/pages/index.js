import React from 'react'
import { useSelector} from 'react-redux';
import { selectLogged, selectUserName, selectUserFirstName } from './LoginSlice';
import 'animate.css';
import {
  WelcomeContainer,
  WelcomeContent,
  WelcomeImg,
  WelcomeContentText,
  WelcomeContentTitle,
  WelcomeText,
  LogoAnimation,
  
} from '../Styles/Welcome.js';

const Homepage = () => {
  const userName = useSelector(selectUserName)
  const firstName = useSelector(selectUserFirstName)
  const logged1 = useSelector(selectLogged)
  

  return (
    <div>
      <LogoAnimation>
        <img src="/images/mylogo.jpeg" />
      </LogoAnimation>

      <WelcomeContainer>
        <WelcomeContent>
          <WelcomeImg>
            <img src="/images/variousHome.jpeg" alt="horse" width="600" height="450" />
          </WelcomeImg>
          <WelcomeContentText className='animate__animated animate__zoomIn'>
            <WelcomeContentTitle>Welcome, {logged1 === true ? firstName === "" ? userName : firstName : "guest"}</WelcomeContentTitle>
            <WelcomeText>
              "Jacobs' Dreams" is a great way to order from home when you are thirsty!
              Enjoy a variety of categories to choose from that help meet your needs in your journey to happinness.
              You can order our highest grade alcohol and non alcohol drinks that you want with our user-friendly interface.
              Please drink responsibly. :)
            </WelcomeText>
            <WelcomeText>
              The order will be sent straight to your door step in less then
              1hr pre-packed for you in portions.
            </WelcomeText>
          </WelcomeContentText>
        </WelcomeContent>


      </WelcomeContainer>
    </div>
  )
}

export default Homepage