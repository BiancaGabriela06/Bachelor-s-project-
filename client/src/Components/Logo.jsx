import React from 'react'
import styled from 'styled-components'
import EcoVoyageLogo from '../assets/images/logo.png'
import {NavLink, useNavigate} from 'react-router-dom'

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const LogoImg = styled.div`
    width: 70px;
    height: 70px;

    img{
        width: 100%;
        height: 100%;
    }
`;

const LogoText = styled.h2`
   font-size: 20px;
   margin: 0;
   margin-left: 4px;
   color: #FFFFFF;
   font-weight: 500;
`

const Logo = () => {
  return (
    <LogoWrapper>
       <NavLink to="/home" ><LogoImg><img src={EcoVoyageLogo} alt="EcoVoyageLogo" /></LogoImg></NavLink>
       <LogoText></LogoText>
    </LogoWrapper> 
  )
  
}

export default Logo