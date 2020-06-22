import Hero from '../components/Hero';
import Movies from '../components/Movies';
import React from 'react';
import { StatusBar, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import Header from '../components/Header';
import Context from '../Context';



const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const state = (context) => {
  return {
    allMovies: context.allMovies,
    userMovies: context.userMovies[context.currentUser.name]
  }
};
const filterLocale = (context, countryCodes) => !countryCodes.includes(context.countryCode);

const Gradient = styled(LinearGradient)`
  height: 100%;
`;

const Poster = styled.ImageBackground`
  width: 100%;
  height: ${(Dimensions.get('window').height * 81) / 100}px;
`;



const Home = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Context.Consumer>
        {context => (
          <Container>
            <Poster source={require('../assets/poster.jpg')}>
              <Gradient
                locations={[0, 0.2, 0.6, 0.93]}
                colors={[
                  'rgba(0,0,0,0.5)',
                  'rgba(0,0,0,0.0)',
                  'rgba(0,0,0,0.0)',
                  'rgba(0,0,0,1)',
                ]}>
                <Header />
                <Hero />
              </Gradient>
            </Poster>
            <Movies label="Minha lista" item={state(context).userMovies} />
            <Movies label="Nacionais" item={state(context).allMovies.filter(m => !filterLocale(context, m.CountryCode))} />
            <Movies label="Internacionais" item={state(context).allMovies.filter(m => filterLocale(context, m.CountryCode))} />
          </Container>)
        }
      </Context.Consumer>
    </>
  );
};
export default Home;
