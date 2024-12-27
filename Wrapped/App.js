import { StatusBar } from 'expo-status-bar';
import { StyleSheet,LogBox  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from './Splash & Login Screen/splash'; // Vérifiez bien le chemin
import Splash2 from './Splash & Login Screen/splash2';
import LoginP1 from './Splash & Login Screen/LoginP1';
import AcountDet from './Splash & Login Screen/AcountDet';
import LoginWEmail from './Splash & Login Screen/LoginWEmail';
import SignIn from './Splash & Login Screen/SignIn';
import ForgetPassword from './Splash & Login Screen/ForgetPass';
import NPassword from './Splash & Login Screen/Npaswword';
import ProfilePage from './Profile/ProfilePage/ProfilePage';
import UpdatePage from './Profile/UpdateProfile/UpdatePage';
import SettingsPage from './Profile/Sitings/SettingsPage';
import MySales from './Profile/ProfilePage/widgets/MySales';
import PostDetails from './Profile/PostDetails';
import AddPost from './Post/AddPost/AddPost';
import AddBrand from './Post/AddPost/AddBrand';
import SignUpPro from './Splash & Login Screen/SignUpPro';
import ProfilePro from './Profile/ProfilePro/ProfilePro';
import DescoveryPage from './Discovery/Discovery';
import MyBag from './myBag/MyBag';
import WhatsHotPage from './WhatsHot/WhatsHot';
import LayoutWrapper from './widgets/Layout_wrapper';
import ArticleDetails from './Post/PostDetail/ArticleDetails';
export default function App() {
  const Stack = createNativeStackNavigator();
  LogBox.ignoreAllLogs(); // Ignorer tous les avertissements

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" options={{ headerShown: false }} component={Splash} />
        <Stack.Screen name="Splash2" options={{ headerShown: false }} component={Splash2} />
        <Stack.Screen name="LoginP1" options={{ headerShown: false }} component={LoginP1} />
        <Stack.Screen name="AcountDet" options={{ headerShown: false }} component={AcountDet} />
        <Stack.Screen name="LoginWEmail" options={{ headerShown: false }} component={LoginWEmail}/>
        <Stack.Screen name="SignIn" options={{ headerShown: false }} component={SignIn}/>
        <Stack.Screen name="ForgetPassword" options={{ headerShown: false }} component={ForgetPassword}/>
        <Stack.Screen name="NPassword" options={{ headerShown: false }} component={NPassword}/>
        <Stack.Screen name="SignUpPro" options={{ headerShown: false }} component={SignUpPro}/>
        {/* ///////////////////////////////////PROFILE////////////////////////////////////////////////////// */}
        <Stack.Screen name="ProfilePage" options={{ headerShown: false }} component={() => <LayoutWrapper><ProfilePage /></LayoutWrapper>} />
        <Stack.Screen name="UpdatePage" options={{ headerShown: false }} component={UpdatePage}/>
        <Stack.Screen name="SettingsPage" options={{ headerShown: false }} component={SettingsPage}/>
        <Stack.Screen name="MySales" options={{ headerShown: false }} component={MySales}/>
        {/* /////////////////////////////////////POST//////////////////////////////////////////////////// */}
        <Stack.Screen name="ProfilePro" options={{ headerShown: false }} component={ProfilePro}/>
        {/* /////////////////////////////////////POST//////////////////////////////////////////////////// */}
        <Stack.Screen name="PostDetails" options={{ headerShown: false }} component={ArticleDetails}/>
        <Stack.Screen name="AddPost" options={{ headerShown: false }} component={AddPost}/>
        <Stack.Screen name="AddBrand" options={{ headerShown: false }} component={AddBrand}/>
        {/* /////////////////////////////////////POST//////////////////////////////////////////////////// */}
        <Stack.Screen name="whatsHot" options={{ headerShown: false }} component={() => <LayoutWrapper><WhatsHotPage /></LayoutWrapper>} />
        <Stack.Screen name="descovery" options={{ headerShown: false }} component={() => <LayoutWrapper><DescoveryPage /></LayoutWrapper>} />
        <Stack.Screen name="myBag" options={{ headerShown: false }} component={MyBag} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
