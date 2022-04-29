import React,{useState} from 'react';
import {
  Image,SafeAreaView,Text,View,Alert,TouchableOpacity, StyleSheet,
} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screen/home'
import UrunEkleScreen from '../screen/urunEkle'
import UrunDetayScreen from '../screen/UrunDetayEkle'
import UrunGuncelleScreen from '../screen/UrunGuncelle'
import GuncelleDetayScreen from '../screen/GuncelleDetay'
import UrunOkuScreen from "../screen/UrunOku"
import UrunFiyatScreen from '../screen/UrunFiyat'
import listeleScreen from '../screen/listele'
import UrunSilDetayScreen from '../screen/UrunSilDetay'

const Stack = createNativeStackNavigator();

const Routes =()=> {
  return (
    <NavigationContainer  >
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen}
      options={{title:"Ana Sayfa",headerTintColor:"#8c90e0"}}/>
      <Stack.Screen name="UrunEkle" component={UrunEkleScreen} 
      options={{title:"ÜRÜN EKLE",headerTintColor:"#8c90e0"}}/>
      <Stack.Screen name="UrunDetayEkle" component={UrunDetayScreen}
      options={{
        headerTintColor:"#8c90e0",title:"Ürün Detayları"
      }}/>
      <Stack.Screen name="UrunGuncelle" component={UrunGuncelleScreen}
      options={{headerTintColor:"#8c90e0",title:"Ürün Güncelle"}}/>
      <Stack.Screen name="GuncelleDetay" component={GuncelleDetayScreen}
      options={{headerTintColor:"#8c90e0",title:"Ürün Güncelle"}}/>
      <Stack.Screen name="UrunOku" component={UrunOkuScreen}
      options={{headerTintColor:"#8c90e0",title:"Ürün Oku"}}/>
      <Stack.Screen name="UrunFiyat" component={UrunFiyatScreen}
      options={{headerTintColor:"#8c90e0",title:"Fiyat Gör"}}/>
      <Stack.Screen name="listele" component={listeleScreen}
      options={{headerTintColor:"#8c90e0",title:"ÜRÜN LİSTESİ"}}/>
      <Stack.Screen name="UrunSilDetay" component={UrunSilDetayScreen}
      options={{headerTintColor:"#8c90e0",title:"ÜRÜN SİL"}}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
};
export default Routes;