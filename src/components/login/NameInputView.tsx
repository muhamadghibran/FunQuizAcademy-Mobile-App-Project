import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/colors";
import { styles } from "../../styles/LoginScreenStyles";
import { WelcomeText } from "./WelcomeText";

interface NameInputViewProps {
  name: string;
  setName: (text: string) => void;
  onSubmit: () => void;
}

export const NameInputView: React.FC<NameInputViewProps> = ({
  name,
  setName,
  onSubmit,
}) => {
  return (
    <View style={styles.contentInputName}>
      <WelcomeText />

      <View style={styles.inputCard}>
        <Text style={styles.cardTitle}>Hello There!</Text>
        <Text style={styles.cardSubtitle}>
          What would you like to play today?
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor={COLORS.textGray}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          returnKeyType="done"
          onSubmitEditing={onSubmit}
        />

        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={onSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.getStartedText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
