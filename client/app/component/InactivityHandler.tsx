import React, { useEffect, useRef } from "react";
import { AppState, AppStateStatus, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

const INACTIVITY_TIMEOUT = 60 * 60 * 1000; // 1 hour

const InactivityHandler = ({ children }) => {
  const timeoutRef = useRef(null);
  const router = useRouter();

  const logout = async () => {
    clearTimeout(timeoutRef.current);
    await SecureStore.deleteItemAsync("userToken"); // Adjust based on your key
    Alert.alert("Logged out", "You were inactive for 1 hour.");
    router.replace("/login");
  };

  const resetInactivityTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(logout, INACTIVITY_TIMEOUT);
  };

  useEffect(() => {
    resetInactivityTimer(); // Set initially

    const subscription = AppState.addEventListener("change", (state: AppStateStatus) => {
      if (state === "active") {
        resetInactivityTimer();
      }
    });

    const events = ["touchstart", "mousedown", "keydown", "mousemove"];
    const handleActivity = () => resetInactivityTimer();

    events.forEach((event) => {
      document?.addEventListener?.(event, handleActivity);
    });

    return () => {
      clearTimeout(timeoutRef.current);
      subscription.remove();
      events.forEach((event) => {
        document?.removeEventListener?.(event, handleActivity);
      });
    };
  }, []);

  return <>{children}</>;
};

export default InactivityHandler;
