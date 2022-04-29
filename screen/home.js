
import React,{useState} from 'react';
import {
  Image,SafeAreaView,Text,View,TouchableOpacity, StatusBar,
} from 'react-native';
import { styles } from '../style';
const HomeScreen=({navigation}) =>{
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
      <StatusBar backgroundColor={"#8c90e0"} />
      <View style={styles.header}>
        <Text style={styles.Text}>KURAL MARKET</Text>
      </View>
      <View style={styles.backgroundStyle}>
        <TouchableOpacity style={styles.button2}
          onPress={() =>navigation.navigate("UrunOku")}
        ><Image source={require("../src/barcode.png")}/>
            <Text style={styles.buttonText}>ÜRÜN OKU</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}
          onPress={()=> navigation.navigate("UrunEkle")}
        ><Image source={require("../src/adder.png")}/>
            <Text style={styles.buttonText}>ÜRÜN EKLE</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
      <TouchableOpacity style={styles.button2}
          onPress={()=> navigation.navigate("listele")}
        ><Image source={require("../src/list.png")}/>
            <Text style={styles.buttonText}>ÜRÜN LİSTELE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}
          onPress={() =>navigation.navigate("UrunGuncelle")}
        ><Image source={require("../src/update.png")}/>
            <Text style={styles.buttonText}>ÜRÜN GÜNCELLE</Text>
        </TouchableOpacity>
      </View>
      <View style={
        {flex:1,backgroundColor:"white",justifyContent:"center",alignItems:"center",
    marginEnd:20}}>
      </View>
    </SafeAreaView> 
  );
}
export default HomeScreen;