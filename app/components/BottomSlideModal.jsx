import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import { Feather } from "@expo/vector-icons";
import { colors } from "../utils/colors";
import { responsive } from "../utils/basicUtils";

const BottomSlideModal = ({
  isVisible,
  onClose,
  title,
  subtitle,
  image,
  children,
  showButton = true,
  buttonText = "Book Appointment",
  onButtonPress,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={["down"]}
      style={styles.modal}
      propagateSwipe
      useNativeDriver
      backdropTransitionOutTiming={0}
      avoidKeyboard
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.pullBar} />
          <View style={styles.titleContainer}>
            <View style={styles.titleGroup}>
              {image ? (
                <Image source={image} style={styles.doctorImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Feather
                    name="user"
                    size={responsive.wp(8)}
                    color={colors.text}
                  />
                </View>
              )}
              <View style={styles.titleTextGroup}>
                <Text style={styles.title}>{title}</Text>
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
              </View>
            </View>
            <TouchableOpacity
              onPress={onClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Feather name="x" size={responsive.wp(6)} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {children}
        </ScrollView>

        {showButton && (
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={onButtonPress}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: responsive.wp(5),
    borderTopRightRadius: responsive.wp(5),
    maxHeight: "90%",
  },
  header: {
    paddingTop: responsive.hp(1),
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  pullBar: {
    width: responsive.wp(10),
    height: responsive.hp(0.5),
    backgroundColor: colors.text,
    opacity: 0.2,
    alignSelf: "center",
    borderRadius: responsive.wp(1),
    marginBottom: responsive.hp(2),
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: responsive.wp(4),
    paddingBottom: responsive.hp(2),
  },
  titleGroup: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: responsive.wp(3),
  },
  titleTextGroup: {
    flex: 1,
    marginLeft: responsive.wp(3),
  },
  imagePlaceholder: {
    width: responsive.wp(16),
    height: responsive.wp(16),
    borderRadius: responsive.wp(8),
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  doctorImage: {
    width: responsive.wp(16),
    height: responsive.wp(16),
    borderRadius: responsive.wp(8),
  },
  title: {
    fontSize: responsive.wp(4.5),
    fontWeight: "600",
    color: colors.text,
  },
  subtitle: {
    fontSize: responsive.wp(3.5),
    color: colors.primary,
    marginTop: responsive.hp(0.5),
  },
  content: {
    maxHeight: responsive.hp(60),
  },
  scrollContent: {
    paddingHorizontal: responsive.wp(4),
    paddingBottom: responsive.hp(2),
  },
  sectionContainer: {
    backgroundColor: colors.surface,
    borderRadius: responsive.wp(3),
    padding: responsive.wp(4),
    marginBottom: responsive.hp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: responsive.wp(4),
    fontWeight: "600",
    color: colors.text,
    marginBottom: responsive.hp(1),
  },
  divider: {
    height: 1,
    backgroundColor: colors.background,
    marginVertical: responsive.hp(2),
  },
  infoText: {
    fontSize: responsive.wp(3.5),
    color: colors.text,
    lineHeight: responsive.hp(2.5),
  },
  bulletPoint: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: responsive.hp(1),
  },
  bullet: {
    fontSize: responsive.wp(3.5),
    color: colors.text,
    marginRight: responsive.wp(2),
  },
  bottomContainer: {
    padding: responsive.wp(4),
    paddingBottom: Platform.OS === "ios" ? responsive.hp(4) : responsive.hp(3),
    borderTopWidth: 1,
    borderTopColor: colors.background,
    backgroundColor: colors.surface,
  },
  button: {
    backgroundColor: colors.primary,
    padding: responsive.hp(1.8),
    borderRadius: responsive.wp(2),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: colors.surface,
    fontSize: responsive.wp(4),
    fontWeight: "600",
  },
});

export default BottomSlideModal;
