// App.js
import React from "react";
import { AuthProvider } from "./contexts/AuthProvider";
import { EventsProvider } from "./contexts/EventsProvider";
import RootNavigator from "./navigation/RootNavigator";

export default function App() {
  return (
    <AuthProvider>
      <EventsProvider>
        <RootNavigator />
      </EventsProvider>
    </AuthProvider>
  );
}
