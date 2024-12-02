import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  HeartIcon,
  ChevronLeftIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from 'react-native-heroicons/solid';
import {ClockIcon, FireIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';

const DetailPage = ({route}) => {
  const navigation = useNavigation();
  const item = route.params;

  //   console.log(item.item.idMeal);

  const [productDetail, setProductDetail] = useState({});

  useEffect(() => {
    const fetchProductDetail = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.item.idMeal}`,
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data.meals[0]);
        setProductDetail(data.meals[0]);
      } else {
        console.error('Failed to fetch meal');
      }
    };
    fetchProductDetail();
  }, [item.item.idMeal]);

  const backHandler = () => {
    navigation.goBack(); // Or use navigation.navigate('Login') if you want to go to Login screen
  };

  const handleFavoritePress = () => {
    console.log('Favorite button pressed');
    // Handle favorite logic here
  };

  const ingredientsIndexes = meal => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 0; i <= 20; i++) {
      if (meal['strIngredient' + i]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          padding: hp(2),
        }}>
        <TouchableOpacity
          onPress={backHandler}
          style={{padding: 5, borderRadius: '100%', backgroundColor: 'white'}}>
          <ChevronLeftIcon color={'orange'} size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleFavoritePress}>
          <HeartIcon color={'white'} size={35} />
        </TouchableOpacity>
      </View>

      <Image source={{uri: item.item.strMealThumb}} style={styles.image} />

      <View style={styles.textContainer}>
        <Text style={styles.heading}>{productDetail.strMeal}</Text>
        <Text style={styles.area}>{productDetail.strArea}</Text>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              borderWidth: 1,
            }}>
            <View>
              <ClockIcon />
              <Text>35</Text>
              <Text>Mins</Text>
            </View>
            <View>
              <UsersIcon />
              <Text>03</Text>
              <Text>Servings</Text>
            </View>
            <View>
              <FireIcon />
              <Text>103</Text>
              <Text>cal</Text>
            </View>
            <View>
              <Square3Stack3DIcon />
              <Text></Text>
              <Text>Easy</Text>
            </View>
          </View>
          <View>
            <Text>Ingredients</Text>
          </View>
          <View>
            <Text>Instructions</Text>
            <Text>{productDetail.strInstructions}</Text>
          </View>
          <View>
            <Text>Youtube Video</Text>
            <Text>{productDetail.strInstructions}</Text>
            <View>
              <YoutubePlayer
                height={300}
                play={false}
                videoId={productDetail.strYoutube}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DetailPage;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flex: 1,
    alignItems: 'center',
    paddingTop: 5,
  },
  image: {
    width: wp('98%'),
    zIndex: 0,
    height: '50%',
    borderRadius: 20,
  },
  textContainer: {width: '100%', flex: 1, borderWidth: 1, padding: 15},
  heading: {fontSize: 22, fontWeight: 'bold'},
  detailsContainer: {
    width: '100%',

    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 15,
  },
});
