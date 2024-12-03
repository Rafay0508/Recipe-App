import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Profiler, useEffect, useState} from 'react';
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
import LoaderKit from 'react-native-loader-kit';
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

  const getIngredients = () => {
    let ingredientsWithMeasures = [];

    // Loop through the keys of the object
    for (let i = 1; i <= 20; i++) {
      // There are 20 possible ingredients and measures
      const ingredientKey = `strIngredient${i}`;
      const measureKey = `strMeasure${i}`;

      if (productDetail[ingredientKey] && productDetail[measureKey]) {
        // Push both ingredient and measure as a pair
        ingredientsWithMeasures.push({
          ingredient: productDetail[ingredientKey],
          measure: productDetail[measureKey],
        });
      }
    }

    return ingredientsWithMeasures;
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
              marginVertical: 15,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              // borderWidth: 1,
            }}>
            <View
              style={{
                backgroundColor: '#FAB12F',
                padding: 10,
                alignItems: 'center',

                borderRadius: 30,
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 4,
                  borderRadius: '100%',
                  marginBottom: 4,
                }}>
                <ClockIcon size={25} />
              </View>
              <Text style={styles.textSize}>35</Text>
              <Text style={styles.textSize}>Mins</Text>
            </View>

            <View
              style={{
                backgroundColor: '#FAB12F',
                padding: 10,
                alignItems: 'center',

                borderRadius: 30,
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 4,
                  borderRadius: '100%',
                  marginBottom: 4,
                }}>
                <UsersIcon size={25} />
              </View>
              <Text style={styles.textSize}>03</Text>
              <Text style={{fontSize: 10}}>Servings</Text>
            </View>

            <View
              style={{
                backgroundColor: '#FAB12F',
                padding: 10,
                alignItems: 'center',

                borderRadius: 30,
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 4,
                  borderRadius: '100%',
                  marginBottom: 4,
                }}>
                <FireIcon size={25} />
              </View>
              <Text style={styles.textSize}>103</Text>
              <Text style={styles.textSize}>cal</Text>
            </View>

            <View
              style={{
                backgroundColor: '#FAB12F',
                padding: 10,
                alignItems: 'center',

                borderRadius: 30,
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 4,
                  borderRadius: '100%',
                }}>
                <Square3Stack3DIcon size={25} />
              </View>

              <Text></Text>
              <Text style={styles.textSize}>Easy</Text>
            </View>
          </View>
          <View>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginVertical: 4}}>
              Ingredients
            </Text>
            <View style={{width: '100%', flexDirection: 'column'}}>
              {getIngredients().length > 0 ? (
                getIngredients().map((ingredient, index) => (
                  <View
                    key={index}
                    style={{
                      marginVertical: 10,
                      gap: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: 'orange',
                        width: 10,
                        height: 10,
                        borderRadius: '100%',
                      }}></View>
                    <Text
                      style={{
                        fontSize: 16,
                      }}>{`${ingredient.ingredient}: ${ingredient.measure}`}</Text>
                  </View>
                ))
              ) : (
                <LoaderKit
                  style={{width: 50, height: 50}}
                  name={'BallPulse'}
                  color={'red'}
                />
              )}
            </View>
          </View>
          <View>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginVertical: 4}}>
              Instructions
            </Text>
            <Text>{productDetail.strInstructions}</Text>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 4}}>
              Youtube Video
            </Text>

            <View style={{marginTop: 10}}>
              <YoutubePlayer
                height={300}
                play={false}
                videoId={
                  (productDetail.strYoutube?.match(
                    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
                  ) || [])[1]
                }
              />
            </View>
          </View>
          <View>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginVertical: 2}}>
              Tags
            </Text>

            <View style={{marginVertical: 10}}>
              <Text>{productDetail.strTags}</Text>
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
    height: '30%',
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
  textSize: {
    fontSize: 12,
  },
});
