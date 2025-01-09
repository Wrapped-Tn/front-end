import { StatusBar } from 'expo-status-bar';
import { StyleSheet,LogBox  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from './src/Splash & Login Screen/splash'; // Vérifiez bien le chemin
import Splash2 from './src/Splash & Login Screen/splash2';
import LoginP1 from './src/Splash & Login Screen/LoginP1';
import AcountDet from './src/Splash & Login Screen/AcountDet';
import LoginWEmail from './src/Splash & Login Screen/LoginWEmail';
import SignIn from './src/Splash & Login Screen/SignIn';
import ForgetPassword from './src/Splash & Login Screen/ForgetPass';
import NPassword from './src/Splash & Login Screen/Npaswword';
import ProfilePage from './src/Profile/ProfilePage/ProfilePage';
import UpdatePage from './src/Profile/UpdateProfile/UpdatePage';
import SettingsPage from './src/Profile/Sitings/SettingsPage';
import MySales from './src/Profile/ProfilePage/widgets/MySales';
import AddPost from './src/Post/AddPost/AddPost';
import AddBrand from './src/Post/AddPost/AddBrand';
import SignUpPro from './src/Splash & Login Screen/SignUpPro';
import ProfilePro from './src/Profile/ProfilePro/ProfilePro';
import DescoveryPage from './src/Discovery/Discovery';
import MyBag from './src/myBag/MyBag';
import WhatsHotPage from './src/WhatsHot/WhatsHot';
import LayoutWrapper from './src/widgets/Layout_wrapper';
import ArticleDetails from './src/Post/PostDetail/ArticleDetails';
import Checkout from './src/myBag/Checkout';
import AddAdress from './src/myBag/AddAdress';
import VisitorProfilePage from './src/Profile/ViewProfile/VisitorProfilePage'
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
        {/* /////////////////////////////////////Brand//////////////////////////////////////////////////// */}
        <Stack.Screen name="ProfilePro" options={{ headerShown: false }} component={ProfilePro}/>
        {/* /////////////////////////////////////POST//////////////////////////////////////////////////// */}
        <Stack.Screen name="PostDetails" options={{ headerShown: false }} component={ArticleDetails}/>
        <Stack.Screen name="AddPost" options={{ headerShown: false }} component={AddPost}/>
        <Stack.Screen name="AddBrand" options={{ headerShown: false }} component={AddBrand}/>
        {/* /////////////////////////////////////POST//////////////////////////////////////////////////// */}
        <Stack.Screen name="whatsHot" options={{ headerShown: false }} component={WhatsHotPage} />
        <Stack.Screen name="descovery" options={{ headerShown: false }} component={DescoveryPage} />
        {/* /////////////////////////////////////My Bag//////////////////////////////////////////////////// */}
        <Stack.Screen name="myBag" options={{ headerShown: false }} component={MyBag} />
        <Stack.Screen name="Checkout" options={{ headerShown: false }} component={Checkout} />
        <Stack.Screen name="AddAdress" options={{ headerShown: false }} component={AddAdress} />
        {/* /////////////////////////////////////VisitorProfilePage//////////////////////////////////////////////////// */}
        <Stack.Screen name="VisitorProfilePage" options={{ headerShown: false }} component={VisitorProfilePage} />

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
