import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {TextInput} from 'react-native-gesture-handler';

const HomePage = () => {
  const [category, setCategory] = useState([]);
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/categories.php',
      );
      if (response.ok) {
        const data = await response.json();
        setCategory(data.categories);
      } else {
        console.error('Failed to fetch categories');
      }
    };

    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchRecipesByCategory = async () => {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/filter.php?c=dessert',
      );
      if (response.ok) {
        const data = await response.json();
        setRecipes(data.meals);
      } else {
        console.error('Failed to fetch categories');
      }
    };

    fetchRecipesByCategory();
  }, []);

  // console.log(recipes);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topRow}>
        <Image
          source={require('../assets/profile.png')}
          style={styles.profileImg}
        />
        <BellIcon style={styles.bellIcon} size={35} />
      </View>
      <View style={styles.helloText}>
        <Text>Hello, Abdul Rafay!</Text>
      </View>
      <View style={styles.headerText}>
        <Text style={styles.text}>Make your own food,</Text>
        <Text style={styles.text}>
          stay at <Text style={{color: 'orange'}}>home</Text>
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={number}
          placeholder="Search any recipe"
          // keyboardType="numeric"
        />
        <View style={styles.searchContainer}>
          <MagnifyingGlassIcon />
        </View>
      </View>
      <View>
        <ScrollView horizontal style={styles.categoryContainer}>
          {category &&
            category.sort().map(item => {
              return (
                <View style={styles.category} key={item.idCategory}>
                  <View style={styles.categoryImgContainer}>
                    <Image
                      source={{
                        uri: item.strCategoryThumb,
                      }}
                      style={[{width: 40, height: 40}, styles.categoryImg]}
                    />
                  </View>
                  <Text style={{textAlign: 'center'}}>{item.strCategory}</Text>
                </View>
              );
            })}
        </ScrollView>
      </View>
      <View style={styles.recipeContainer}>
        <Text style={styles.heading}>Recipes</Text>
        <ScrollView>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {recipes &&
              recipes.map(item => {
                return (
                  <View
                    key={item.idMeal}
                    style={{
                      borderWidth: 1,
                      width: wp('38%'),
                      height: hp('30%'),
                      backgroundColor: '#fff',
                      borderRadius: 10,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.25,
                      shadowRadius: 3.5,
                      elevation: 5, // For Android shadow
                      margin: 10,
                      alignItems: 'center',
                      padding: 10,
                    }}>
                    <Image
                      source={{uri: item.strMealThumb}}
                      style={{
                        width: '100%',
                        height: '60%',
                        borderRadius: 10,
                        marginBottom: 10,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      {item.strMeal.length > 30
                        ? item.strMeal.slice(0, 30) + '...'
                        : item.strMeal}
                    </Text>
                  </View>
                );
              })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
const styles = StyleSheet.create({
  container: {flex: 1, width: '100%', height: '100%'},
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: hp('1%'),
    // borderWidth: 1,
    alignItems: 'center',
  },
  profileImg: {width: 40, height: 40},
  bellIcon: {},
  helloText: {paddingHorizontal: wp('3%')},
  headerText: {
    paddingHorizontal: wp('3%'),
    paddingTop: hp('1%'),
  },
  text: {fontSize: hp('3.5%'), fontWeight: 'bold'},
  inputContainer: {paddingHorizontal: 10, paddingVertical: 20},
  input: {
    backgroundColor: '#E6E6E6',
    borderRadius: 100,
    height: 50,
    paddingHorizontal: 15,
  },
  searchContainer: {
    position: 'absolute',
    top: 24,
    left: wp(86),
    padding: 8,
    backgroundColor: 'white',
    borderRadius: '100%',
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  category: {padding: '4', alignItems: 'center'},
  categoryImgContainer: {
    padding: 10,
    backgroundColor: '#E6E6E6',
    borderRadius: '100%',
  },
  categoryImg: {},
  recipeContainer: {padding: 20},
  heading: {fontSize: hp(3), fontWeight: 'bold', marginVertical: 3},
});
