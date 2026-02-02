import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLanguage } from "../context/LanguageContext";
import { styles } from "../styles/SettingScreenStyles";

export const SettingScreen = () => {
  const navigation = useNavigation<any>();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const { t, language, setLanguage } = useLanguage();

  React.useEffect(() => {
    AsyncStorage.multiGet([
      "@setting_notif",
      "@setting_sound",
      "@setting_dark",
    ]).then((values) => {
      if (values[0][1] !== null)
        setNotificationsEnabled(values[0][1] === "true");
      if (values[1][1] !== null) setSoundEnabled(values[1][1] === "true");
      if (values[2][1] !== null) setDarkMode(values[2][1] === "true");
    });
  }, []);

  const toggleSwitch = (
    key: string,
    value: boolean,
    setter: (v: boolean) => void,
  ) => {
    setter(value);
    AsyncStorage.setItem(key, String(value));
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{t("settingsTitle")}</Text>
      <View style={{ width: 40 }} />
    </View>
  );

  const renderSectionHeader = (title: string) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const renderSwitchItem = (
    title: string,
    value: boolean,
    onValueChange: (val: boolean) => void,
    icon: string,
    storageKey: string,
  ) => (
    <View style={styles.settingItem}>
      <View style={styles.itemLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon as any} size={22} color={COLORS.primary} />
        </View>
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
      <Switch
        trackColor={{ false: "#E5E7EB", true: COLORS.primary }}
        thumbColor={COLORS.white}
        ios_backgroundColor="#E5E7EB"
        onValueChange={(val) => toggleSwitch(storageKey, val, onValueChange)}
        value={value}
      />
    </View>
  );

  const renderActionItem = (
    title: string,
    icon: string,
    onPress: () => void,
    isDestructive = false,
    valueRight?: string,
  ) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.itemLeft}>
        <View
          style={[
            styles.iconContainer,
            isDestructive && { backgroundColor: "#FEE2E2" },
          ]}
        >
          <Ionicons
            name={icon as any}
            size={22}
            color={isDestructive ? "#EF4444" : COLORS.primary}
          />
        </View>
        <Text style={[styles.itemTitle, isDestructive && { color: "#EF4444" }]}>
          {title}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {valueRight && (
          <Text style={{ marginRight: 10, color: COLORS.textGray }}>
            {valueRight}
          </Text>
        )}
        <Ionicons name="chevron-forward" size={20} color="#C4C4C4" />
      </View>
    </TouchableOpacity>
  );

  const showPlaceholder = (feature: string) => {
    Alert.alert(feature, t("featureComingSoon"));
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView contentContainerStyle={styles.content}>
        {renderSectionHeader(t("preferences"))}
        <View style={styles.section}>
          {renderSwitchItem(
            t("pushNotifications"),
            notificationsEnabled,
            setNotificationsEnabled,
            "notifications-outline",
            "@setting_notif",
          )}
          {renderSwitchItem(
            t("soundEffects"),
            soundEnabled,
            setSoundEnabled,
            "volume-high-outline",
            "@setting_sound",
          )}
          {renderSwitchItem(
            t("darkMode"),
            darkMode,
            setDarkMode,
            "moon-outline",
            "@setting_dark",
          )}
          {renderActionItem(
            t("language"),
            "globe-outline",
            () => setShowLanguageModal(true),
            false,
            language === "en" ? "English" : "Indonesia",
          )}
        </View>

        {renderSectionHeader(t("account"))}
        <View style={styles.section}>
          {renderActionItem(t("editProfile"), "person-outline", () =>
            navigation.navigate("EditProfile"),
          )}
          {renderActionItem(
            t("resetProgress"),
            "refresh-outline",
            () => {
              Alert.alert(
                t("resetProgress"),
                `${t("areYouSure")} ${t("cannotUndo")}`,
                [
                  { text: t("cancel"), style: "cancel" },
                  {
                    text: t("reset"),
                    style: "destructive",
                    onPress: () =>
                      showPlaceholder("This functionality requires DB clear."),
                  },
                ],
              );
            },
            true,
          )}
        </View>

        {renderSectionHeader(t("support"))}
        <View style={styles.section}>
          {renderActionItem(t("helpSupport"), "help-circle-outline", () =>
            showPlaceholder("Help"),
          )}
          {renderActionItem(
            t("privacyPolicy"),
            "shield-checkmark-outline",
            () => showPlaceholder("Privacy Policy"),
          )}
          {renderActionItem(t("aboutUs"), "information-circle-outline", () =>
            showPlaceholder("About Us"),
          )}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      <Modal
        visible={showLanguageModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowLanguageModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t("language")}</Text>

            <TouchableOpacity
              style={[
                styles.langOption,
                language === "en" && styles.langOptionActive,
              ]}
              onPress={() => {
                setLanguage("en");
                setShowLanguageModal(false);
              }}
            >
              <Text
                style={[
                  styles.langText,
                  language === "en" && styles.langTextActive,
                ]}
              >
                English
              </Text>
              {language === "en" && (
                <Ionicons name="checkmark" size={20} color={COLORS.primary} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.langOption,
                language === "id" && styles.langOptionActive,
              ]}
              onPress={() => {
                setLanguage("id");
                setShowLanguageModal(false);
              }}
            >
              <Text
                style={[
                  styles.langText,
                  language === "id" && styles.langTextActive,
                ]}
              >
                Indonesia
              </Text>
              {language === "id" && (
                <Ionicons name="checkmark" size={20} color={COLORS.primary} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowLanguageModal(false)}
            >
              <Text style={styles.closeButtonText}>{t("cancel")}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};
