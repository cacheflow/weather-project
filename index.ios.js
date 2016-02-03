/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image
} from 'react-native';

import Forecast from './App/Components/Forecast'

class WeatherProject extends Component {
  constructor() {
    super();
    this.state = {
      zip: '',
      forecast: ''
    };
  }
  handleTextChange(event) {
    let zip = event.nativeEvent.text
    console.log("my zip is ", zip);
    this.getWeather(zip);
  }

  getWeather(zip) {
    let url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=44db6a862fba0b067b1930da0d769e98`
    fetch(url).then((response) => response.json())
    .then((responseJSON) => {
      this.setForecastState(responseJSON);
    }).catch((error) => {
      console.warn(error);
    })
  }

  setForecastState(...responseJSON) {
    const {main, description} = responseJSON[0].weather[0]
    const {temp} = responseJSON[0].main
    this.setState({
      forecast: {
        main,
        description,
        temp
      }
    });
    console.log("your state for forecast is", this.state.forecast);
  };
  render() {
    const {main, description, temp} = this.state.forecast
    var content;
    if(this.state.forecast !== null) {
      content = <Forecast
                  main={this.state.forecast.main}
                  description={this.state.forecast.description}
                  temp={this.state.forecast.temp} />;
    }
    return (
      <View style={styles.container}>
        <Image source={require('./weather.jpg')}
               resizeMode='cover'
               style={styles.backdrop}>
          <View style={styles.overlay}>
           <View style={styles.row}>
             <Text style={styles.mainText}>
               Current weather for
             </Text>
             <View style={styles.zipContainer}>
               <TextInput
                 style={[styles.zipCode, styles.mainText]}
                 returnKeyType='go'
                 onSubmitEditing={this.handleTextChange.bind(this)}/>
             </View>
           </View>
            {content}
         </View>
        </Image>
      </View>
    );
  }
}

let baseFontSize = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
  },
  backdrop: {
    flex: 1,
    flexDirection: 'column'
  },
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5,
    flexDirection: 'column',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    padding: 30
  },
  zipContainer: {
    flex: 1,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3
  },
  zipCode: {
    width: 50,
    height: baseFontSize,
  },
  mainText: {
    flex: 1,
    fontSize: baseFontSize,
    textAlign: 'center',
    color: '#ffffff'
  },
  input: {
    fontSize: 20,
    borderWidth: 2,
    height: 40
  }
});


AppRegistry.registerComponent('WeatherProject', () => WeatherProject);
