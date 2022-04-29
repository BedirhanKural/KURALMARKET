import React  from 'react';
import {LogBox,PermissionsAndroid,Appearance} from "react-native";
import Routes from './routes/routes';
const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "KAMERA İZİNİ",
        message:
          "KURAL MARKET kameranızı kullanmak istiyor",
        buttonNeutral: "Daha sonra sor",
        buttonNegative: "Reddet",
        buttonPositive: "Kabul et"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};
const App= ()=> {
  requestCameraPermission();
  LogBox.ignoreAllLogs();
  return <Routes/>
};
export default App;
