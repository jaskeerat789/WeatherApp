import React from 'react';
import { StyleSheet, Text, View,TextInput,Button, } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
export default class App extends React.Component {
  constructor(props)
  {
    super(props)
    this.state={
      isLoading:'true',
      data:null,
      temp:null,
      city:null,
      iconlist:[
        '',
        'ios-sunny',
        'ios-partly-sunny',
        'ios-cloudy',
        'ios-cloudy',
        'ios-cloudy',
        'md-rainy',
        'ios-rainy',
        'ios-thunderstorm',
        'ios-snow',
        'ios-menu'
      ],
      icon:'md-flower',
    }
  }

  press=()=>{
    console.log('in the press');
    
    this.setState({city:this.state.temp},()=>{
        console.log("in the set state",this.state.city);
        if(this.state.city)
        {
        var url='http://api.openweathermap.org/data/2.5/weather?q='+this.state.city+'&appid=2b9ee4a4d1fdf8129b28010d372d904e'
        return fetch(url)
        .then((res)=>res.json())
        .then((json)=>{
          let icon_number=parseInt(json.weather[0].icon.substring(0,2));
          this.setState({
          data:(json.main.temp-273).toFixed(0).toString(),
          description:json.weather[0].description,
          iconname:json.weather[0].icon,
          icon:this.state.iconlist[icon_number]})})
        .then(()=>console.log(this.state))
        .catch((e)=>console.log(e))
    }
  })
}

  render() {
    return (
      <View style={styles.container}>
      {this.state.city?<Text style={[styles.text,{marginTop:40}]}>{(this.state.city)}</Text>:<Text style={[styles.text,{marginTop:40}]}>{"WELCOME"}</Text>}
      <Ionicons style={{paddingTop:0,justifyContent:'center'}} name={this.state.icon} size={120} color='white'/>
      {this.state.data?<Text style={styles.text}>{(this.state.data)}°C</Text>:<Text style={styles.text}>{""}</Text>}
      {this.state.data?<Text style={{fontSize:20,color:'rgba(255,255,255,0.95)'}}>{(this.state.description)}</Text>:<Text >{""}</Text>}
      

        <View style={styles.searchbar}>
        
        <TextInput placeholder="enter here" style={styles.textInput}
          onChangeText={(input)=>this.setState({temp:input})}
          underlineColorAndroid='rgba(0,0,0,0)'
        />
        
        <Button style={styles.button} title="search"
          onPress={this.press}
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444851',
    alignItems: 'center',
    justifyContent: 'flex-start',
    
  },
  textInput:{
    paddingHorizontal:5,
    marginBottom:10,
    borderWidth:1,
    borderColor:'white',
    borderRadius:5,
    width:'65%',
    height:40,
    fontSize:18,
    color:'rgb(255,255,255)'
  },
  searchbar:{
    marginTop:100,
    width:'100%',
    height:90,
    alignItems: 'center',
    
  },
  text:{
    color:'rgba(255,255,255,0.95)',
    fontSize:35,
  },
  button:{
    marginTop:10 
  },
});
