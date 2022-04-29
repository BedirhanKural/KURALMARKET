"use strict";
import React,{Component} from 'react';
import {
  Text,View,TouchableOpacity,AppRegistry,StyleSheet,Vibration,ToastAndroid
} from 'react-native';
import BarcodeScanner from "react-native-scan-barcode";
let barkod;
let control;
control=true;
 export default class UrunEkleScreen extends Component {
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
            this.props.navigation.navigate("UrunDetayEkle",{paramKey:barkod})
          }
          >
            <Text style={styles1.buttonText}>ÜRÜN EKLE</Text>
          </TouchableOpacity>
          </View>
    );
  }
}
const styles1 = StyleSheet.create({
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
AppRegistry.registerComponent('default', () => UrunOkuScreen);
