import React  from 'react';
import Tabs from './routes/Tabs';
import Camera from './screen/Camera';
import ChooseIcon from './screen/ChooseIcon';
import ProfileToEdit from './screen/ProfileToEdit';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Geocoder from 'react-native-geocoder';
import Geolocation  from '@react-native-community/geolocation';
import Context from './Context';


const Stack = createStackNavigator();



export default class App extends React.Component {
  userMovies = require('./assets/UsersMovies.json');
  allMovies = require('./assets/Movies.json');

  profiles = require('./util/Users');

  state = {
    currentUser: this.profiles[0],
    profiles: this.profiles,
    countryCode: '',
  }

  selectUser = user => {
    this.setState({
      currentUser: user
    })
  }

  updateProfile = user => {
    this.setState({
      profiles: this.state.profiles.map(usr => user.name == usr.name ? user : usr)
    })  
}

async componentDidMount() {
  try {
    const position = await Geolocation.getCurrentPosition();
    const geoCode = await Geocoder.geocodePosition({ lat: position.coords.latitude, lng: position.coords.longitude })
    if (geoCode[0]){
      this.setState({ countryCode: geoCode[0].countryCode})
    }  
  } catch {}
}

  render() {
    return (
      <Context.Provider value={{
        profiles: this.state.profiles, 
        currentUser: this.state.currentUser,   
        allMovies: this.allMovies,
        userMovies: this.userMovies,
        countryCode: this.state.countryCode,
        selectUser: this.selectUser,
        updateProfile: this.updateProfile
      }}>
        <NavigationContainer>
          <Stack.Navigator>

            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Camera"
              component={Camera}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ChooseIcon"
              component={ChooseIcon}
              options={{ headerShown: true }}
            />

            <Stack.Screen
              name="ProfileToEdit"
              component={ProfileToEdit}
              options={{ headerShown: true }}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </Context.Provider>
    )
  }

}