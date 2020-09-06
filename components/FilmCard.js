import StarRating from 'react-native-star-rating';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import React from 'react';

const FilmCard = ( {filmInfo: {ratingNumber, title, description}, storeRating } ) => {
     
    const [starCount, setStarCount] = useState(ratingNumber);

    const onStarRatingPress = (rating) => {
        setStarCount(rating)
    };

    return (
        
        <>
        <View style={styles.container}> 
        
            <View style={styles.details}>
                <View style={{ paddingBottom: 20}}>
                <Text style={{ fontSize: 24, fontWeight: '500'}} >{title}</Text>
                </View>
                <Text style={{ fontSize: 16}} >{description ? description : 'No description for this film' }</Text>
            </View>

            <View style={styles.rating}>
                <StarRating
                    starSize={50}
                    starStyle={{padding: 9}}
                    disabled={false}
                    maxStars={5}
                    rating={starCount}
                    selectedStar={(rating) => onStarRatingPress(rating)}
                />
            </View> 

            <View style={styles.bottomButtons} > 
            
                <TouchableOpacity onPress={() => storeRating(starCount)}>
                    <View style={styles.eachButton} >
                        <Text style={{color: "black", fontSize: 16, fontWeight: '500'}}>
                            Score
                        </Text>
                    </View>
                </TouchableOpacity >


                <TouchableOpacity onPress={null}>
                    <View style={styles.eachButton} >
                        <Text style={{color: "black", fontSize: 16, fontWeight: '500'}}>
                            Submit
                        </Text>
                    </View>
                </TouchableOpacity >

            </View>

        </View>
      </>
    );
 
}

 const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    details: { 
        flex: 0.5,
        padding: 30,
        margin: 10,
        justifyContent: 'space-evenly',
        alignItems: 'flex-start', 
    },

    rating: { 
      backgroundColor: '#fff', 
      alignItems: 'center',
      justifyContent: 'center',
    },

    bottomButtons: {
        paddingTop: 200,
        paddingBottom: 40,
        justifyContent: 'space-around',
        flexDirection: 'row',
    },

    eachButton: {
        width: 120,
        height: 50,
        borderWidth: 1,
        shadowOpacity: 1,
        shadowRadius: 1,
        shadowColor: 'black',
        shadowOffset: { height: 3, width: 3 },
        alignItems: 'center',
        justifyContent: 'center' 
    }
  });
  

export default FilmCard;