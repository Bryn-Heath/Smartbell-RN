import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import FilmCard from './components/FilmCard';
import { AsyncStorage } from 'react-native';

import filmList from './movies.json'
 
const RATING_LIST = 'rating_list'
const RATED_LIST = 'rated_list'

// const nextFilm = filmList[1]

export default function App() {
  const [AppFilms, setAppFilms] = useState([...filmList])

  const nextFilm = AppFilms[0]

  const [filmRatingState, setFilmRatingState] = useState([])
  const [ratedFilmsState, setFilmRated] = useState([])

  const storeScoreRating = async (addFilmRatingState) => {
    setFilmRatingState([...filmRatingState, addFilmRatingState])
    try{
      await AsyncStorage.setItem(RATING_LIST, JSON.stringify(filmRatingState))
    } catch (e) {
      console.log(e);
    }
  };

  const storeRated = async (key, ratedFilmsState) => {
    try{
      await AsyncStorage.setItem(RATED_LIST, JSON.stringify(ratedFilmsState))
    } catch (e) {
      console.log(e);
    }
  };

  const getScoreRating = async ( ) => { 
    try{
      const value = await AsyncStorage.getItem(RATING_LIST)
      setAppFilms([...filmList, value])
    } catch (e) {
      console.log(e);
    }
  }; 

  useEffect(() => {
    return () => {
     setAppFilms(getScoreRating)
    };
  }, [0])

  return (
    <View style={styles.container}>
      
      <FilmCard key={nextFilm.id} filmInfo={nextFilm} storeRating={() => storeScoreRating()} />
      
      <StatusBar style="auto" />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 3, 
    flexDirection: 'column',
  },
});
