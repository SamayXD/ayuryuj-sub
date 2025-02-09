import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../utils/colors";
import { responsive } from "../utils/basicUtils";

const DoctorCard = ({ doctor, onBook, onKnowMore }) => (
  <View style={styles.card}>
    <View style={styles.cardLeft}>
      <View style={styles.imageContainer}>
        <Feather name="user" size={responsive.wp(12)} color={colors.text} />
      </View>
      <View style={styles.expBox}>
        <Text style={styles.expText}>{doctor.experience} YOE</Text>
      </View>
    </View>

    <View style={styles.cardRight}>
      <Text style={styles.doctorName}>{doctor.name}</Text>
      <Text style={styles.education}>{doctor.education[0]}</Text>
      <Text style={styles.specialty}>{doctor.specialty}</Text>
      <Text style={styles.languages}>
        Speaks: {doctor.languages.join(", ")}
      </Text>
      <Text style={styles.price}>₹{doctor.price} per session</Text>

      <View style={styles.cardActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.bookButton]}
          onPress={() => onBook(doctor)}
        >
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.knowMoreButton]}
          onPress={() => onKnowMore(doctor)}
        >
          <Text style={[styles.buttonText, styles.knowMoreText]}>
            Know More
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: responsive.wp(3),
    padding: responsive.wp(3),
    marginBottom: responsive.hp(1.5),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardLeft: {
    alignItems: "center",
    marginRight: responsive.wp(3),
  },
  imageContainer: {
    width: responsive.wp(20),
    height: responsive.wp(20), // Keep square aspect ratio using wp
    backgroundColor: colors.background,
    borderRadius: responsive.wp(2),
    justifyContent: "center",
    alignItems: "center",
  },
  expBox: {
    backgroundColor: colors.primaryAlpha(0.1),
    padding: responsive.hp(0.5),
    borderRadius: responsive.wp(1),
    marginTop: responsive.hp(1),
  },
  expText: {
    color: colors.primary,
    fontSize: responsive.wp(3),
    fontWeight: "600",
  },
  cardRight: {
    flex: 1,
  },
  doctorName: {
    fontSize: responsive.wp(4),
    fontWeight: "600",
    color: colors.text,
    marginBottom: responsive.hp(0.5),
  },
  education: {
    fontSize: responsive.wp(3),
    color: colors.text,
    opacity: 0.8,
  },
  specialty: {
    fontSize: responsive.wp(3.5),
    color: colors.primary,
    marginVertical: responsive.hp(0.5),
  },
  languages: {
    fontSize: responsive.wp(3),
    color: colors.text,
    opacity: 0.8,
  },
  price: {
    fontSize: responsive.wp(3.5),
    fontWeight: "600",
    color: colors.text,
    marginTop: responsive.hp(0.5),
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: responsive.hp(1.5),
    gap: responsive.wp(2),
  },
  actionButton: {
    flex: 1,
    paddingVertical: responsive.hp(1),
    borderRadius: responsive.wp(1),
    alignItems: "center",
  },
  bookButton: {
    backgroundColor: colors.primary,
  },
  knowMoreButton: {
    backgroundColor: colors.primaryAlpha(0.1),
  },
  buttonText: {
    color: colors.surface,
    fontWeight: "600",
    fontSize: responsive.wp(3.5),
  },
  knowMoreText: {
    color: colors.primary,
  },
});

export default DoctorCard;
