import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {TextInput} from 'react-native-gesture-handler';
import Categories from '../components/Categories';
import Recipes from '../components/Recipes';
import Search from '../components/Search';

const HomePage = () => {
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
        <Search />
        {/* <TextInput
          style={styles.input}
          onChangeText={setSearch}
          value={search}
          placeholder="Search any recipe"
        />
        <View style={styles.searchContainer}>
          <MagnifyingGlassIcon />
        </View> */}
      </View>
      <View>
        <Categories />
      </View>
      <View style={styles.recipeContainer}>
        <Text style={styles.heading}>Recipes</Text>
        <ScrollView>
          <Recipes />
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

  categoryImg: {},
  recipeContainer: {padding: 20},
  heading: {fontSize: hp(3), fontWeight: 'bold', marginVertical: 3},
});
