import React from 'react';
import WelcomePage from './Pages/WelcomePage';
import LoginPage from './Pages/HomePage';
import {NavigationContainer} from '@react-navigation/native'; // Import NavigationContainer
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    // Wrap the stack navigator inside NavigationContainer
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="Login" component={LoginPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
