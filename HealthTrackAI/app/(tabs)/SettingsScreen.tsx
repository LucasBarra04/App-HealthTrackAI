import React, { useState, createContext, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ThemeContext = createContext();
