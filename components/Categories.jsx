import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import LoaderKit from 'react-native-loader-kit';
import {useCategory} from '../context/CategoryContext'; // Import the context hook

const Categories = () => {
  const [category, setCategory] = useState([]);
  const {selectedCategory, setSelectedCategory} = useCategory(); // Access selectedCategory and setSelectedCategory

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

  return (
    <ScrollView horizontal style={styles.categoryContainer}>
      {category.length > 0 ? (
        category
          .sort((a, b) => a.strCategory.localeCompare(b.strCategory)) // Sort categories alphabetically
          .map(item => (
            <TouchableOpacity
              key={item.idCategory}
              onPress={() => setSelectedCategory(item.strCategory)} // Update selected category in context
            >
              <View style={styles.category}>
                <View
                  style={[
                    styles.categoryImgContainer,
                    item.strCategory === selectedCategory
                      ? {backgroundColor: 'orange'}
                      : {backgroundColor: '#E6E6E6'},
                  ]}>
                  <Image
                    source={{
                      uri: item.strCategoryThumb,
                    }}
                    style={[{width: 40, height: 40}, styles.categoryImg]}
                  />
                </View>
                <Text style={{textAlign: 'center'}}>{item.strCategory}</Text>
              </View>
            </TouchableOpacity>
          ))
      ) : (
        <LoaderKit
          style={{width: 50, height: 50}}
          name={'BallPulse'}
          color={'red'}
        />
      )}
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  category: {padding: '4', alignItems: 'center'},
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  categoryImgContainer: {
    padding: 5,
    backgroundColor: '#E6E6E6',
    borderRadius: '100%',
  },
  categoryImg: {
    borderRadius: 50, // Make the image round
  },
});
