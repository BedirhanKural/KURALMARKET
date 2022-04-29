import React,{useState} from 'react';
import {
  Image,SafeAreaView,Text,View,Alert,TouchableOpacity,LogBox
} from 'react-native';
import { styles } from '../style';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'KuralDatabase.db' });
LogBox.ignoreAllLogs();
const UrunFiyatScreen=({route,navigation}) =>{
  let searchUser;
  let [userData, setUserData] = useState({});
  let barkod=route.params.paramKey;
  searchUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_urun where urun_barkod = ?',
        [barkod],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setUserData(results.rows.item(0));
          } else {
            Alert.alert(
              'HATA',
              'Ürün bulunamadı.',
              [
                {
                  text: 'Tamam',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              { cancelable: false }
            );
          
          }
        }
      );
    });
  };
  return (
    <SafeAreaView style={{flex:1,marginTop:100,alignItems:"center"}}>
      {searchUser()}
      <Text style={{color:"#8c90e0",fontSize:25}}>ÜRÜN:{userData.urun_ad}</Text>
      <Text style={{color:"#8c90e0",fontSize:40}}>FİYAT:{userData.urun_fiyat} TL</Text>
      <TouchableOpacity style={styles.button2}
          onPress={()=> navigation.navigate("Home")}
        ><Image source={require("../src/home.png")}/>
            <Text style={styles.buttonText}>Ana Sayfa</Text>
        </TouchableOpacity>
    </SafeAreaView>
    
  );
}
export default UrunFiyatScreen;