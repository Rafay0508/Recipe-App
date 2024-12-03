import {StyleSheet, TextInput, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {useSearch} from '../context/SearchContext'; // Import useSearch
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Search = () => {
  const navigation = useNavigation();
  const {search, setSearch} = useSearch(); // Access search state and setter from context

  // Navigate to search result screen when the search query is submitted
  const searchHandler = () => {
    if (search.trim() !== '') {
      navigation.navigate('Searched', {search});
    }
  };

  // Handle submit when user presses return/enter key on keyboard
  const handleSubmitEditing = () => {
    searchHandler();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setSearch} // Update the search query in context
        value={search}
        placeholder="Search any recipe"
        returnKeyType="search" // Change the keyboard return key to "search"
        onSubmitEditing={handleSubmitEditing} // Trigger search when the user submits
      />
      <TouchableOpacity style={styles.searchContainer} onPress={searchHandler}>
        <MagnifyingGlassIcon size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(90), // Adjust the width for better responsiveness
    marginVertical: hp(2), // Add vertical spacing
  },
  input: {
    backgroundColor: '#E6E6E6',
    borderRadius: 100,
    height: 50,
    paddingHorizontal: 15,
    flex: 1, // Let the input take available space
  },
  searchContainer: {
    position: 'absolute',
    right: 10, // Place the search icon to the right of the input field
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 50, // Circular shape for the icon container
  },
});
