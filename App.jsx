import React from 'react';
import WelcomePage from './Pages/WelcomePage';
import LoginPage from './Pages/HomePage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import CategoryProvider
import {CategoryProvider} from './context/CategoryContext';
import DetailPage from './Pages/DetailPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    // Wrap your entire app with the CategoryProvider
    <CategoryProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Welcome"
            component={WelcomePage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Detail"
            component={DetailPage}
            // options={{headerShown: true}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CategoryProvider>
  );
};

export default App;
