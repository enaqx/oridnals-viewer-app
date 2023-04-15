import * as React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderBackButton } from "@react-navigation/elements";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { store } from "./app/store";
import Main from "./app/screens/Main";
import Details from "./app/screens/Details";
import { Ordinal } from "./app/types";
import theme from "./app/themes/theme";

type RootStackParamList = {
  Home: undefined;
  Details: { inscription: Ordinal };
};

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={({ navigation }) => ({
              headerLeft: () => (
                <HeaderBackButton
                  labelVisible={false}
                  tintColor={theme.colors.light}
                  onPress={() => navigation.goBack()}
                />
              ),
            })}
          >
            <Stack.Screen
              name="Home"
              component={Main}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Details"
              component={Details}
              options={{
                headerStyle: {
                  backgroundColor: theme.colors.dark,
                },
                headerTintColor: theme.colors.light,
                headerTitleStyle: {
                  fontWeight: "600",
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
}
