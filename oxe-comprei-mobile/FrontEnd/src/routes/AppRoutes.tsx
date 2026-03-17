import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthCard from "../components/Card/AuthCard";
import { Home } from "../views/screens/Home/Home";
import InitialScreen from "../views/screens/InitialScreen/Initial";


// 1. Defina os tipos das rotas aqui
export type RootStackParamList = {
  Auth: { screenMode: 'login' | 'register' };
  Home: undefined;
  Initial: undefined;
};

// 2. Passe o tipo para o Stack
const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Initial" component={InitialScreen}/>
      <Stack.Screen name="Auth" component={AuthCard} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}