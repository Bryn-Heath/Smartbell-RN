import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import FilmCard from './components/FilmCard';
import { AsyncStorage } from 'react-native';

import filmList from './movies.json'
  
// const nextFilm = filmList[1]

export default function App() {
  const [AppFilms, setAppFilms] = useState([])
  const nextFilm = AppFilms[0]
  
  const storeScoreRating = async (addFilmRatingState) => {
    // const keyAndData = `${nextFilm.id}, ${addFilmRatingState}`
      try {
        await AsyncStorage.setItem(`${nextFilm.id}`, `${addFilmRatingState}`)
          console.log('setting',`${nextFilm.id}`, `${addFilmRatingState}`) 
      } catch (e) {
        console.log(e);
      }
  }
        
  const getScoreRating = async (filmList) => {
    try {
      // uncomment below to clear local data
      await AsyncStorage.clear()

       let localKeyValues = await AsyncStorage.getAllKeys((err, keys) => {
          AsyncStorage.multiGet(keys, (err, stores) => { 
          stores.map((result, i, store) => {  
          });
           });
      });
        
        console.log('localKeyValues',  localKeyValues )
 
      if (localKeyValues.length > 0) { 
        console.log('hit')
        const removingFilmsArr = [ ...filmList.filter(film =>  
          {return film.id !== localKeyValues.find(key => key == film.id) }
        )]
        setAppFilms(removingFilmsArr)
      } else { return  setAppFilms(filmList) }

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getScoreRating(filmList)
  }, [null])

  return (
    <>
      { nextFilm ?
        <View style={ styles.container }>
          <FilmCard key={ nextFilm.id } filmRating={ nextFilm.rating } filmInfo={ nextFilm } storeRating={ (starCount) => storeScoreRating(starCount) } />
          <StatusBar style="auto" />
        </View>
        : null
      }

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 3,
    flexDirection: 'column',
  },
});
