import React from 'react'
import styled from 'styled-components'

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 80vh;
    color: #fff;
`

const Error = styled.h1`
    font-size: 5rem;
    margin: 1rem;
`

type Props = {
    error: any
}

function ErrorComponent(props: Props){
    return(
        <ErrorContainer>
            <Error data-testid="errormsg">{'< ! >'}</Error>
            <p>{props.error}</p>
        </ErrorContainer>
    )
}

export default ErrorComponent