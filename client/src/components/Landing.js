import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import backdrop from '../images/pizza-backdrop.jpg';

const LandingDiv = styled.div`
    width: 100%;  
    max-width: 700px;
    margin: 15px auto;
    img {
        width: 100%;
    }
    p {
        margin: 15px auto;
        max-width: 500px;
        text-align: left;
    }
`;

const Landing = props => {
    return (
        <LandingDiv>
            <img src={backdrop} alt="Mouth-watering food" />
            <p>Do you have trouble finding recipes that meet your dietary needs and avoid your allergens? Don't Eat That is the app for you! Here you can collect recipes or upload your own, and easily see which don't meet your nutritional standards.</p>
        </LandingDiv>
    );
}

const ConditionalLanding = (args) => (
    <Route {...args} render={(props) => (
        // Redirect to the Recipe List page if the user is logged in; otherwise display the nested Landing component defined above.
        localStorage.uid
            ? <Redirect to={{
                pathname: '/recipes',
                state: { from: props.location }
            }} />
            : <Landing {...props} />
    )} />
)

export default ConditionalLanding;