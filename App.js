import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera } from 'expo-camera';
import { useState, useEffect } from 'react';

export default function App() {

  const [hascampermission, sethascampermission] = useState(null);
  const [camera, setCamera] = useState[null];
  const [image,setImage] = useState[null];
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(()=>{
    (async()=>{
      const camStatus = await Camera.requestCameraPermissionsAsync();
      sethascampermission(camStatus.status === "granted");
    })();
  },[])

  const takePic = async () =>{
    if(camera){
      const data = await camera.takePicAsync();
      setImage(data.uri);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameracontainer}>
        <Camera style={styles.camera} type={type} ratio={'1:1'} ref={(ref) => setCamera(ref)} />
      </View>
      <View style={{flex:0, flexDirection:'row', justifyContent:'center',}}>
        <TouchableOpacity onPress={()=>{
          setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
        }}>
          <Image style={styles.icon} source={require('./images/pngegg.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => takePic()}>
          <Image style={styles.icon} source={require('./images/pngwing.com.png')}/>
        </TouchableOpacity>
      </View>
      {image && <Image source={{uri:image}}  style={{flex:1,}}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  icon:{
    width:50,
    height:50,
    margin:10,
  },
  cameracontainer:{
    flex:1,

  },
  camera:{
    flex:1, 
    aspectRatio:1,
  }
});
