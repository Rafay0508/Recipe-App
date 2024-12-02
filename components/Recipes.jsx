import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useCategory} from '../context/CategoryContext';
import MasonryList from '@react-native-seoul/masonry-list';
import LoaderKit from 'react-native-loader-kit';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const {selectedCategory} = useCategory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipesByCategory = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`,
      );
      if (response.ok) {
        const data = await response.json();
        setRecipes(data.meals);
      } else {
        console.error('Failed to fetch recipes');
      }
      setIsLoading(false);
    };
    fetchRecipesByCategory();
  }, [selectedCategory]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <LoaderKit
          style={{width: 50, height: 50}}
          name={'BallPulse'}
          color={'red'}
        />
      </View>
    );
  }

  return (
    <MasonryList
      data={recipes}
      keyExtractor={item => item.idMeal.toString()}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      renderItem={({item, i}) => <CardItem item={item} index={i} />}
    />
  );
};

export default Recipes;

const CardItem = ({index, item}) => {
  const navigation = useNavigation();
  const imageStyle = [
    {width: wp(42), borderRadius: 20},
    index % 2 === 0 ? {height: hp(25)} : {height: hp(35)},
  ];
  const handlePress = () => {
    navigation.navigate('Detail', {item});
  };

  return (
    <TouchableOpacity
      style={{width: '95%', marginBottom: 15}}
      onPress={handlePress}>
      <Image source={{uri: item.strMealThumb}} style={[imageStyle]} />
      <Text style={{textAlign: 'center', marginTop: 5}}>{item.strMeal}</Text>
    </TouchableOpacity>
  );
};
