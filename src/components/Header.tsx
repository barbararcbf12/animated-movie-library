import React from 'react'
import styled from 'styled-components'
import { Link }  from 'react-router-dom'
import logo from '../logo_mml.svg'
import '../App.css'
  
const HeaderStyled = styled.header`
    background-color: #111;
    min-height: 4vh;
    display: flex;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: #fff;
    position: relative;
    flex: 1;
`
const LogoStyled = styled.div`
    margin: 5px 0 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10vh;
`

function Header() {
    return (
        <HeaderStyled>
            <LogoStyled>
                <Link to="/">
                    <img src={logo} className="App-logo" alt="logo" data-testid="logo" />
                </Link>
            </LogoStyled>
        </HeaderStyled>
    )
}

export default Header
  