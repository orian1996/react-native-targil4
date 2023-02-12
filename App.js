import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AllNotes from './Screens/AllNotes';
import AddNote from './Screens/AddNote';
import Home from './Screens/Home';


const Stack = createNativeStackNavigator()
export default function App() {
  return (
   
     <NavigationContainer>
     <Stack.Navigator initialRouteName="Home">
     <Stack.Screen name=" Home" component={Home} />
       <Stack.Screen name="My Notes" component={AllNotes} />
       <Stack.Screen name="Add Note" component={AddNote} />
    
     
     </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
