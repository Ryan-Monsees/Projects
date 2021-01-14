import React, {useRef} from 'react';
import { YellowBox, StyleSheet, Text, View} from 'react-native';


import HomeStack from './routes/homeStack';
import AsyncStorage from '@react-native-community/async-storage';
import './global.js'

import * as SQLite from 'expo-sqlite';
import storeData from './components/StoreData';




// Displays the HomeStack, which allows the activation
// of React Navigation
export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  // Runs once when the app starts
  componentDidMount() {

    YellowBox.ignoreWarnings([
      'Non-serializable values were found in the navigation state',
    ]);
    


    this.getData();


    

  }


 
  

 
  
  
  /*  
     Gathers all the data from local storage. Also gets
     the current date and see if it's different from the 
     stored date, indicating we need to store the 
     current habits array reset it.
  */
  getData = async() => {
    
    
    
     try {
        
        // Gets the current date
        const date = (new Date().getMonth() + 1) + " " +
        new Date().getDate() + " " +
        new Date().getFullYear();

        // Gets the list of habits
        const array = await AsyncStorage.getItem('array') || '[]';
        habits = JSON.parse(array);

        // Gets the list of prevHabits
        const array2 = await AsyncStorage.getItem('prevArray') || '[]';
        prevHabits = JSON.parse(array2);

        // gets the stored dates and stores them in global variables
        const storedPrevDate = await AsyncStorage.getItem('prevDate') || "";
        const storedCurrDate = await AsyncStorage.getItem('currDate') || "";
        prevDate = storedPrevDate;
        currDate = storedCurrDate;

        // Checks to see if currDate is accurate or empty
        if(currDate == "" || date != currDate)
        {
          prevDate = currDate;
          currDate = date;
          
          // Stores the habits from the prev day in an array
          prevHabits = JSON.parse(JSON.stringify(habits));
          storeData.StorePrevHabits();       

          for(var i = 0; i < habits.length; i++)
          {
            habits[i].count = 0;
          }
          
          storeData.StoreHabits();


        }

      // Stores the accurate dates
      await AsyncStorage.setItem('prevDate', prevDate);
      await AsyncStorage.setItem('currDate', currDate);
        
      console.log("current prevDate: " + prevDate);
      console.log("current currDate: " + currDate);

     }  catch(err) {
       console.log(err);
     }
    
     
     
    

    }



// Renders the HomeStack for navigation
render() {
  return (
  <HomeStack/>
  );
};
};



