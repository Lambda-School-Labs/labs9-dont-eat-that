import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Header, Icon, Responsive } from 'semantic-ui-react';
// import { url } from 'inspector';

const LandingDiv = styled.div`
  height: 100%;
  p {
    margin: 15px auto;
    max-width: 500px;
    text-align: left;
  }
`;

const ArrowDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Landing = props => {
  const headerStyles1 = () => {
    return {
      fontFamily: `Dancing Script`,
      textAlign: 'left',
      fontWeight: 'bold',
      fontSize: '9rem',
      margin: '10px 0 0 5%'
    };
  };
  const headerStyles2 = () => {
    return {
      fontFamily: `Dancing Script`,
      textAlign: 'left',
      fontWeight: 'bold',
      fontSize: '6rem',
      margin: '10px 0 0 5%'
    };
  };
  return (
    <LandingDiv>
      <Responsive style={{ height: '90vh' }} minWidth={501}>
        <Header as="h1" style={headerStyles1()}>
          Don't
          <br />
          Eat
          <br />
          That
        </Header>
        <ArrowDiv>
          <Icon name="long arrow alternate down" size="huge" />
        </ArrowDiv>
      </Responsive>
      <Responsive style={{ height: '90vh' }} maxWidth={500}>
        <Header as="h1" style={headerStyles2()}>
          Don't
          <br />
          Eat
          <br />
          That
        </Header>
        <ArrowDiv>
          <Icon name="long arrow alternate down" size="huge" />
        </ArrowDiv>
      </Responsive>
      <div style={{ background: 'white', width: '100%', fontFamily: 'Roboto' }}>
        <p>
          Do you have trouble finding recipes that meet your dietary needs and
          avoid your allergens? Don't Eat That is the app for you! Here you can
          collect recipes or upload your own, and easily see which don't meet
          your nutritional standards.
        </p>
        <Button onClick={e => props.history.push('/recipes')}>
          Enter the Site!
        </Button>
      </div>
    </LandingDiv>
  );
};

const ConditionalLanding = args => (
  <Route
    {...args}
    render={props =>
      // Redirect to the Recipe List page if the user is logged in; otherwise display the nested Landing component defined above.
      localStorage.uid ? (
        <Redirect
          to={{
            pathname: '/recipes',
            state: { from: props.location }
          }}
        />
      ) : (
        <Landing {...props} />
      )
    }
  />
);

export default ConditionalLanding;
