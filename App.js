import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import RootNavigator from "./src/navigation/RootNavigator";
import { store } from "./src/redux/store";
import { StatusBar } from "react-native";
import colors from "./src/themes/colors";
import {
  NotificationListner,
  requestUserPermission,
} from './src/screens/PushNotification';

const App = () => {
  useEffect(() => {
    requestUserPermission();
    NotificationListner();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={colors.transparent} translucent={true} />
      <RootNavigator />
    </Provider>
  );
};

export default App;
