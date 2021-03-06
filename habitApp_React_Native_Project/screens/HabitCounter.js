import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import '../global.js';
import storeData from '../components/StoreData';


import Header from '../components/Header';
import HabitCounterDisplay from '../components/HabitCounterDisplay';

export default class HabitCounter extends React.Component {

    
    constructor(props) {
        super(props);
  
       
  
        this.state = {
          habitsArray: habits
          
        }       
        
        
    }

    componentDidMount() {
      this.listener = this.props.navigation.addListener('focus', () => { 
      this.setState({habitsArray: habits});

       
    });
     
    }

    updateArray() {

        this.setState({habitsArray: habits});
        this.forceUpdate();
        console.log("Habit Counter array updated");
    }

    render() {
        return(
            <View style={styles().container}>

            <Header navigation={this.props.navigation} name = "Habit Counter"/>
            <ScrollView showsVerticalScrollIndicator={true}>
          {/* Displays the list of habits */}
          { this.state.habitsArray.map((item, index)=>(
            // Makes it so when you click on a Habit it passes the habit index and updateHabits() to Edit Habit Mode and navigates to it
            //<TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate("Edit Habit Mode", {index: index, onGoBack: () => this.updateHabits()})}
                                     // key= {index}>
            <View  key={index}>
              <HabitCounterDisplay
                    index= {index}
                    name= {item.name}
                    count= {item.count}
                    update={() => this.updateArray()}
              />
            </View>
            
            )
            )
          }
          </ScrollView>

          
            </View>

        );
    }
}

EStyleSheet.build({ $rem: sWidth / sHeight });

const styles = (props) => EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: prim
    },

   


});