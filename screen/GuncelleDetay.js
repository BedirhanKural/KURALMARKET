import React,{useState} from 'react';
import {
  Image,SafeAreaView,Text,View,Alert,TouchableOpacity,ToastAndroid, TextInput,LogBox
} from 'react-native';
import { styles } from '../style';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'KuralDatabase.db' });
LogBox.ignoreAllLogs();
const GuncelleDetayScreen=({route,navigation}) =>{
  let searchUser;
  let [UrunAd, setUrunAd] = useState("")
  let [UrunFiyat, setUrunFiyat] = useState(0)
  let [userData, setUserData] = useState({});
  let barkod=route.params.paramKey;
  if (barkod==null) {
    ToastAndroid.show("okunan barkod yok",ToastAndroid.SHORT);
    navigation.navigate("Home");
  }
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
              "Ürün bulunamadı")
          }
        }
      );
    });
  };
  searchUser();
  let updateUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_urun set urun_ad=?, urun_barkod=? , urun_fiyat=? where urun_id=?',
        [UrunAd,userData.urun_barkod,UrunFiyat,userData.urun_id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Başarılı',
              'Ürün Güncelleme Başarılı',
              [
                {
                  text: 'TAMAM',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Güncelleme Başarısız');
        }
      );
    });
  };


  
  return (
    <SafeAreaView style={{flex:1,paddingTop:100,alignItems:"center"}}>
      <Text>OKUNAN BARKOD:{route.params.paramKey}</Text>
      <TextInput 
      style={styles.EditText}
      placeholder='ürün ismini giriniz...'
      placeholderTextColor="gray"
      onChangeText={UrunAd => setUrunAd(UrunAd)}
      />
      <TextInput 
      style={styles.EditText}
      placeholder="fiyatı giriniz."
      placeholderTextColor="gray"
      onChangeText={UrunFiyat => setUrunFiyat(UrunFiyat)}
      keyboardType='numeric'
      />
       <TouchableOpacity style={styles.button2}
        onPress={()=> 
            {
              updateUser()
            }
        }
        ><Image source={require("../src/update.png")}/>
            <Text style={styles.buttonText}>Ürünü Güncelle</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}
export default GuncelleDetayScreen;