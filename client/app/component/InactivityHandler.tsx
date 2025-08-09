import React, { useEffect, useRef } from "react";
import { AppState, AppStateStatus, Alert } from "react-native";
import * as SecureStore from "expo-secure-store"; // For secure token storage
import { useRouter } from "expo-router";

const INACTIVITY_TIMEOUT = 60 * 60 * 1000; // ⏱ 1 hour (in milliseconds)

const InactivityHandler = ({ children }) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to store inactivity timer
  const router = useRouter();

  /**
   * 🔒 Logout function
   * - Clears the inactivity timer
   * - Deletes the secure token
   * - Alerts the user
   * - Redirects to login screen
   */
  const logout = async () => {
    clearTimeout(timeoutRef.current);
    await SecureStore.deleteItemAsync("userToken"); // Replace key if different
    Alert.alert("Logged out", "You were inactive for 1 hour.");
    router.replace("/login"); // Redirect to login page
  };

  /**
   * ♻️ Resets inactivity timer
   * - Clears existing timer
   * - Starts a new timer for the defined timeout duration
   */
  const resetInactivityTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(logout, INACTIVITY_TIMEOUT);
  };

  useEffect(() => {
    // Start timer immediately when the component mounts
    resetInactivityTimer();

    /**
     * 📱 Listen to AppState changes
     * - If the app becomes active again, reset the timer
     */
    const subscription = AppState.addEventListener("change", (state: AppStateStatus) => {
      if (state === "active") {
        resetInactivityTimer();
      }
    });

    /**
     * 🖱 Listen to user interaction events
     * - These events help detect activity when running in a web-like environment
     * - Useful for Expo Web or hybrid apps
     */
    const events = ["touchstart", "mousedown", "keydown", "mousemove"];
    const handleActivity = () => resetInactivityTimer();
    events.forEach((event) => {
      document?.addEventListener?.(event, handleActivity);
    });

    // 🧹 Cleanup on unmount
    return () => {
      clearTimeout(timeoutRef.current);
      subscription.remove();
      events.forEach((event) => {
        document?.removeEventListener?.(event, handleActivity);
      });
    };
  }, []);

  // Render children normally, wrapping them with inactivity tracking
  return <>{children}</>;
};

export default InactivityHandler;