"use strict";
import React,{useState,Component} from 'react';
import {
  Image,SafeAreaView,Text,View,TouchableOpacity,AppRegistry,StyleSheet,ToastAndroid,Vibration
} from 'react-native';
import BarcodeScanner from "react-native-scan-barcode";

//import { styles } from '../style';
let barkod;
let control;
export default class UrunGuncelleScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      torchMode: 'off',
      cameraType: 'back',
    };
    control=true;
  }
  barcodeReceived(e) {
    barkod=e.data;
    console.log('Barcode: ' + e.data);
    if (control==true && barkod!=null)
    {
     ToastAndroid.show("barkod okundu",ToastAndroid.SHORT); 
     control=false;
    }
    Vibration.vibrate();
  }
  render() {
    return (
      <View style={{flex:1}}>
      <BarcodeScanner
        onBarCodeRead={this.barcodeReceived}
        style={{ flex: 1 }}
        torchMode={this.state.torchMode}
        cameraType={this.state.cameraType}
      />
      <TouchableOpacity style={styles1.buttonTouchable}
          onPress={()=>
            this.props.navigation.navigate("GuncelleDetay",{paramKey:barkod})
          }
          >
            <Text style={styles1.buttonText}>ÜRÜNÜ GÜNCELLE</Text>
          </TouchableOpacity>
          </View>
    );
  }
}
const styles1 = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    marginBottom:30,
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: '#8c90e0'
  },
  buttonTouchable: {
    marginTop:20,
    padding: 16,
    alignItems:"center",
    marginBottom:20,
  }
});
AppRegistry.registerComponent('UrunGuncelleScreen', () => UrunGuncelleScreen);