import React,{useState} from 'react';
import {
  Image,SafeAreaView,Text,Alert,TouchableOpacity,LogBox
} from 'react-native';
import { styles } from '../style';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'KuralDatabase.db' });
LogBox.ignoreAllLogs();
let kontrol=true;
const UrunSilDetayScreen=({route,navigation}) =>{
  let searchBarkod;
  let inputId=route.params.paramKey;
  let [userData, setUserData] = useState({});
  searchBarkod = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_urun where urun_id = ?',
        [inputId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setUserData(results.rows.item(0));
            return kontrol=false;
          } else {
              if(kontrol)//ürün silindiğinde alert çalışmasın.
            return kontrol=true
          }
        }
      );
    });
  };
  let deleteItem = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  table_urun where urun_id=?',
        [inputId],
        (tx, results) => {
          
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Başarılı',
              'Ürün Başarıyla silindi.',
              [
                {
                  text: 'Tamam',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('hata');
          }
        }
      );
    });
  };
  return (
    <SafeAreaView style={{flex:1,marginTop:100,alignItems:"center"}}>
      {searchBarkod()}
      <Text style={{color:"#8c90e0",fontSize:25}}>ÜRÜN:{userData.urun_ad}</Text>
      <Text style={{color:"#8c90e0",fontSize:20}}>Barkod:{userData.urun_barkod}</Text>
      <TouchableOpacity style={styles.button2}
          onPress={()=> navigation.navigate("Home")}
        ><Image source={require("../src/home.png")}/>
            <Text style={styles.buttonText}>Ana Sayfa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}
        disabled={kontrol}
          onPress={()=>deleteItem() }
        ><Image source={require("../src/delete.png")}/>
            <Text style={styles.buttonText}>Ürünü Sil</Text>
        </TouchableOpacity>
    </SafeAreaView>
    
    
  );
}
export default UrunSilDetayScreen;