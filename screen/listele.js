// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to view all the user*/

import React, { useState, useEffect } from 'react';
import { FlatList, Text, View,LogBox,SafeAreaView,TouchableOpacity,Image } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'KuralDatabase.db' });
LogBox.ignoreAllLogs();
const listeleScreen= ({navigation}) => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_urun',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.3,
          width: '100%',
          backgroundColor: 'black'
        }}
      />
    );
  };

  let listItemView = (item) => {
    return (
      <View>
      <View
        key={item.urun_id}
        style={{ backgroundColor: 'white', padding: 20 }}>
        <Text style={{color:"black"}}>ÜRÜN: {item.urun_ad}</Text>
        <Text style={{color:"gray"}}>BARKOD NO:{item.urun_barkod}</Text>
        <Text style={{color:"gray"}}>FİYAT: {item.urun_fiyat} TL</Text>
      </View>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-start",paddingStart:20}}>
      <TouchableOpacity style={{paddingBottom:20,paddingEnd:10}}
          onPress={()=> navigation.navigate("GuncelleDetay",{paramKey:item.urun_barkod})}
        ><Image source={require("../src/updateicon.png")}/>
        </TouchableOpacity>
        <TouchableOpacity style={{paddingBottom:20}}
          onPress={()=> navigation.navigate("UrunSilDetay",{paramKey:item.urun_id})}
        ><Image source={require("../src/delete.png")}/>
        </TouchableOpacity>
      </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default listeleScreen;