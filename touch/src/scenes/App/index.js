
import React, { Component } from 'react';
import{
	View,
	StyleSheet
} from 'react-native'
import $ from 'jquery'
import Wxs from './check';

export default class index extends Component {

  render() {
    return (
      <View style={styles.App}>
        <View style={styles.AppSide}>
        </View>

        <View id="App-Phone" style={styles.AppPhone}>
          <View style={styles.Phonebox}>
            <View style={styles.Phone}>
				<Wxs/>
            </View>
          </View>
        </View>

        <View style={styles.AppSide}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	App: {
		flexDirection:'row'
	},
	AppSide:{
		display: "inline-block",
		width: "7.10rem",
		height: "10.8rem",
		backgroundColor: "grey",
	},
	AppPhone:{
		display: 'inline-block',
		width: '4.70rem',
		height: '10.8rem',
	},
	Phonebox:{
		alignItems:'center',
		justifyContent:'center',
		width: "4.72rem",
		height:"10.2rem",
		borderColor:'#000',
		borderWidth: "1px",
		borderRadius: "0.6rem",	
	},
	Phone:{
		width: "4.36rem",
		height: "8.1rem",
		borderWidth:'1px',

	}
});



