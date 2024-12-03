import React from 'react';
import WelcomePage from './Pages/WelcomePage';
import LoginPage from './Pages/HomePage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import CategoryProvider and SearchProvider
import {CategoryProvider} from './context/CategoryContext';
import {SearchProvider} from './context/SearchContext';
import DetailPage from './Pages/DetailPage';
import SearchPage from './Pages/SearchPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <CategoryProvider>
      <SearchProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
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
            <Stack.Screen
              name="Searched"
              component={SearchPage}
              options={{headerShown: true}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SearchProvider>
    </CategoryProvider>
  );
};

export default App;
