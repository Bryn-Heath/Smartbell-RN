import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { AsyncStorage } from 'react-native';
import FilmCard from './components/FilmCard';
import filmList from './movies.json'
 
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
 
export default function App() {

  const [emailArr, setEmailArr] = useState([])
  const [AppFilms, setAppFilms] = useState([]) 
  let csvFormat = "";
  let csvUri = FileSystem.documentDirectory + "smartBell.csv";

  const toCsv = async(data) => {
       data.forEach(each => csvFormat += `${each[0]}, ${each[1]} \n` ) 
      let options = {encoding: FileSystem.EncodingType.UTF8 }
     await FileSystem.writeAsStringAsync(csvUri, csvFormat, options)  
  }
  
  const handleSubmitEmail = async() => {
    await toCsv(emailArr)
    Sharing.shareAsync(FileSystem.documentDirectory + "smartBell.csv")
  };
   
  const nextFilm = AppFilms[0]
  
  const storeScoreRating = async (addFilmRatingState) => {
       try {
        await AsyncStorage.setItem(`${nextFilm.id}`, `${addFilmRatingState}`)
         
      } catch (e) {
        console.log(e);
      }
  }
        
  const getScoreRating = async (filmList) => {
    try {
      // uncomment below to clear local data
      //await AsyncStorage.clear()
     
       let localKeyValues = await AsyncStorage.getAllKeys((err, keys) => {
     
          AsyncStorage.multiGet(keys, (err, stores) => { 
          setEmailArr(stores)
          stores.map((result, i, store) => {
            return 
          });
          });
          
      });
      
      if (localKeyValues.length > 0) {
        
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
          <FilmCard 
            key={ nextFilm.id } 
            filmRating={ nextFilm.rating } 
            filmInfo={ nextFilm } 
            storeRating={ (starCount) => storeScoreRating(starCount) }
            handleSubmitEmail={handleSubmitEmail}
          />
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