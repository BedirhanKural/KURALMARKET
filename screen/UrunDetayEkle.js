import React, { useState, useEffect } from 'react';
import {
  Image, SafeAreaView, Text,Alert,TouchableOpacity, ToastAndroid, TextInput,LogBox
} from 'react-native';
import { styles } from '../style';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'KuralDatabase.db' });
LogBox.ignoreAllLogs();
const UrunDetayScreen = ({ route,navigation }) => {
  let UrunBarkod;
  UrunBarkod = route.params.paramKey;
  let [UrunAd, setUrunAd] = useState('');
  let [UrunFiyat, setUrunFiyat] = useState('');

  const register_urun=()=> {
    if (UrunBarkod==null) {
      ToastAndroid.show("okunan barkod yok",ToastAndroid.SHORT);
      navigation.navigate("Home");
    }
  }
  let searchBarkod = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_urun where urun_barkod = ?',
        [UrunBarkod],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            ToastAndroid.show("bu barkod zaten kayıtlı!!",ToastAndroid.SHORT)
            navigation.navigate('Home')
            len=0;
          }
        }
      );
    });
  };
  searchBarkod();
  register_urun();
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_urun'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_urun', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_urun(urun_id INTEGER PRIMARY KEY AUTOINCREMENT, urun_ad VARCHAR(20), urun_barkod INT(20), urun_fiyat DOUBLE)',
              []
            );
          }
        }
      );
    });
  }, []);
  barkod=null;
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 100, alignItems: "center" }}>
      <Text style={{color:"black"}}>OKUNAN BARKOD:{UrunBarkod}</Text>
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
        onPress={()=>db.transaction(function (tx) {
          tx.executeSql(
            'INSERT INTO table_urun (urun_ad, urun_barkod, urun_fiyat) VALUES (?,?,?)',
            [UrunAd, UrunBarkod, UrunFiyat],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'BAŞARILI',
                  'ÜRÜN EKLEME BAŞARIYLA GERÇEKLEŞTİ.',
                  [
                    {
                      text: 'TAMAM',
                      onPress: () => navigation.navigate('Home'),
                    },
                  ],
                  { cancelable: false }
                );
              } else alert('Ürün ekleme başarısız');
            }
          );
        })}
      >
        <Image source={require("../src/adder.png")} />
        <Text style={styles.buttonText}>ÜRÜNÜ EKLE</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
export default UrunDetayScreen;