import React from 'react'
import styled from 'styled-components'
  
const FooterStyled = styled.footer`
    border-top: 1px solid #fff;
    color: #fff;
    width: 100%;
    height: 40px;
    bottom: 0;
    padding: 1rem 0;
    justify-content: center;
    display: flex;
`
    
const FooterContent = styled.h5`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    a {
        color: #fff;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
`
  
function Footer() {
    return (
        <FooterStyled>
            <FooterContent>
                <div>@ Barbara Ferreira - barbaraferreira12@gmail.com</div>
                <div>Data source: <a href="http://www.themoviedb.org" target="_blank">The Movie DB</a></div>
            </FooterContent>
        </FooterStyled>
    )
}

export default Footer
  