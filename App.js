import React from 'react';
import { StyleSheet, Text, View,TextInput,Button,ActivityIndicator,Keyboard,Alert} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
export default class App extends React.Component {
  constructor(props)
  {
    super(props)
    this.state={
      isLoading:false,
      data:null,
      temp:'',
      city:'',
      
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
    Keyboard.dismiss()
    console.log('in the press');
    
    this.setState({city:this.state.temp,isLoading:true,temp:''},()=>{
        console.log("in the set state",this.state.city);
        if(this.state.city)
        {
        var url='http://api.openweathermap.org/data/2.5/weather?q='+this.state.city+'&appid=2b9ee4a4d1fdf8129b28010d372d904e'
        return fetch(url)
        .then((res)=>res.json())
        .then((json)=>{
          console.log(json)
          if(json.cod!="404")
          {
          let icon_number=parseInt(json.weather[0].icon.substring(0,2));
          this.setState(
            {
            json:json,
            code:json.cod,
            data:(json.main.temp-273).toFixed(0).toString(),
            description:json.weather[0].description,
            iconname:json.weather[0].icon,
            icon:this.state.iconlist[icon_number],
            isLoading:false

            }
          )
          }
          else
          {
            this.setState({data:json.message,code:json.cod,isLoading:false})
          }
        })
        .then(()=>console.log(this.state)
        )
        .catch((e)=>console.log(e))
    }
    else{
      this.setState({isLoading:false})
    }
  })
}

clear = () => {
  this.textInputRef.clear();
}
check=()=>{
  if(this.state.isLoading)
  {
    return(
      <View style={{width:'100%',justifyContent:'center',alignItems:'center',height:300}}>
      <ActivityIndicator size='large' color='white' />
      </View>
    )
  }
  else if(this.state.code=='404')
  {
      this.setState({code:''})
      Alert.alert(this.state.data)
      return(<View style={{width:'100%',justifyContent:'center',alignItems:'center',height:300}}>
        <Text style={[styles.text,{marginTop:40}]}>{"WELCOME"}</Text>
        <Ionicons style={{paddingTop:0,justifyContent:'center'}} name={this.state.icon} size={120} color='white'/>
      </View>
        
      )
  }
  else if(this.state.code=='200')
  {
    this.setState({code:''})
    return(
      <View style={{width:'100%',justifyContent:'center',alignItems:'center',height:300}}>
        <Text style={[styles.text,{marginTop:40}]}>{(this.state.json.name)}</Text>
        <Ionicons style={{paddingTop:0,justifyContent:'center'}} name={this.state.icon} size={120} color='white'/>
        <Text style={styles.text}>{(this.state.data)}°C</Text>
        <Text style={{fontSize:20,color:'rgba(255,255,255,0.95)'}}>{(this.state.description)}</Text>
      </View>
    )    

  }
  else{
    return(<View style={{width:'100%',justifyContent:'center',alignItems:'center',height:300}}>
    <Text style={[styles.text,{marginTop:40}]}>{"WELCOME"}</Text>
    <Ionicons style={{paddingTop:0,justifyContent:'center'}} name={this.state.icon} size={120} color='white'/>
  </View>)
  }
}

  render() {
    
    return (
      <View style={styles.container}>
      {/* {this.state.isLoading?

         <View style={{width:'100%',justifyContent:'center',alignItems:'center',height:300}}>
         <ActivityIndicator size='large' color='white' />
         </View>
        :
      (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center',height:300}}>
      {this.state.data?<Text style={[styles.text,{marginTop:40}]}>{(this.state.json.name)}</Text>:<Text style={[styles.text,{marginTop:40}]}>{"WELCOME"}</Text>}
      <Ionicons style={{paddingTop:0,justifyContent:'center'}} name={this.state.icon} size={120} color='white'/>
      {this.state.data?<Text style={styles.text}>{(this.state.data)}°C</Text>:<Text style={styles.text}>{""}</Text>}
      {this.state.data?<Text style={{fontSize:20,color:'rgba(255,255,255,0.95)'}}>{(this.state.description)}</Text>:<Text >{""}</Text>}
      </View>
      )
      } */}
      {this.check()}   

        <View style={styles.searchbar}>
        
        <TextInput placeholder="enter here" style={styles.textInput}
          onChangeText={(input)=>this.setState({temp:input})}
          underlineColorAndroid='rgba(0,0,0,0)'
          clearTextOnFocus={true}
          ref={ref => this.textInputRef = ref}
          value={this.state.temp}
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
