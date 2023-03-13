import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import FullScreenLoader from "./components/FullScreenLoader";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import store, { persistor } from "./storage/store";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <NativeBaseProvider>
          <PersistGate loading={<FullScreenLoader />} persistor={persistor}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <SafeAreaProvider>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
              </SafeAreaProvider>
            </GestureHandlerRootView>
          </PersistGate>
        </NativeBaseProvider>
      </Provider>
    );
  }
}
