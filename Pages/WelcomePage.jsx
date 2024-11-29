import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

const WelcomePage = () => {
  const navigation = useNavigation();
  let innerPadding = useSharedValue(hp('0%'));
  let outerPadding = useSharedValue(hp('0%'));

  useEffect(() => {
    // Update the shared values after the timeout
    setTimeout(() => {
      innerPadding.value = withTiming(hp('5%'), {duration: 300}); // Smooth transition for innerPadding
      // console.log('Inner Padding:', innerPadding.value);
    }, 300);

    setTimeout(() => {
      outerPadding.value = withTiming(hp('5%'), {duration: 300}); // Smooth transition for outerPadding
      // console.log('Outer Padding:', outerPadding.value);
    }, 400);

    setTimeout(() => navigation.navigate('Login'), 1800);
  }, []);

  // Animated style for inner ring with shared value for padding
  const innerAnimatedPlateStyle = useAnimatedStyle(() => {
    return {
      padding: innerPadding.value,
    };
  });

  // Animated style for outer ring with shared value for padding
  const outerAnimatedPlateStyle = useAnimatedStyle(() => {
    return {
      padding: outerPadding.value,
    };
  });

  return (
    <View style={styles.container}>
      {/* Apply the animated padding styles */}
      <Animated.View style={[styles.outerRing, outerAnimatedPlateStyle]}>
        <Animated.View style={[styles.innerRing, innerAnimatedPlateStyle]}>
          <Image
            source={require('../assets/plate.png')}
            style={styles.plateIMG}
          />
        </Animated.View>
      </Animated.View>

      {/* Animated text */}
      <View>
        <Animated.Text
          entering={FadeInDown.delay(400).duration(400)}
          style={[{textAlign: 'center'}, styles.heading]}>
          Foody
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(500).duration(400)}
          style={[{textAlign: 'center'}, styles.text]}>
          Here comes a GREAT food
        </Animated.Text>
      </View>
    </View>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: hp('1%'),
  },
  plateIMG: {
    width: wp('45%'),
    height: hp('20%'),
  },
  outerRing: {
    backgroundColor: 'rgba(254,225,201,0.3)',
    borderRadius: '100%',
  },
  innerRing: {
    backgroundColor: 'rgba(254,234,218,0.2)',
    borderRadius: '100%',
  },
  heading: {
    fontSize: hp('6%'),
    color: 'white',
    fontFamily: 'Parkinsans',
    fontStyle: 'italic',
  },
  text: {fontSize: 18, color: 'white'},
});
