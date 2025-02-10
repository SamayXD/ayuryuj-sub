import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { colors } from "../utils/colors";
import { responsive } from "../utils/basicUtils";
import { myAppointments, doctorsData } from "../utils/mockData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSlideModal from "../components/BottomSlideModal";
import { Platform } from "react-native";
import { router } from "expo-router";

const AppointmentCard = ({ appointment, doctor, onPress }) => (
  <TouchableOpacity style={styles.appointmentCard} onPress={onPress}>
    <View style={styles.cardHeader}>
      <View style={styles.doctorInfo}>
        <View style={styles.avatarContainer}>
          <Feather name="user" size={responsive.wp(6)} color={colors.primary} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.specialty}</Text>
        </View>
      </View>
      <View
        style={[
          styles.statusBadge,
          {
            backgroundColor:
              appointment.status === "Completed"
                ? colors.primaryAlpha(0.1)
                : colors.accentAlpha(0.1),
          },
        ]}
      >
        <Text
          style={[
            styles.statusText,
            {
              color:
                appointment.status === "Completed"
                  ? colors.primary
                  : colors.accent,
            },
          ]}
        >
          {appointment.status}
        </Text>
      </View>
    </View>

    <View style={styles.cardContent}>
      <View style={styles.infoRow}>
        <Feather name="calendar" size={responsive.wp(4)} color={colors.text} />
        <Text style={styles.infoText}>{appointment.date}</Text>
      </View>
      <View style={styles.infoRow}>
        <Feather name="clock" size={responsive.wp(4)} color={colors.text} />
        <Text style={styles.infoText}>{appointment.time}</Text>
      </View>
      <View style={styles.infoRow}>
        <Feather
          name={appointment.type === "Video Consultation" ? "video" : "map-pin"}
          size={responsive.wp(4)}
          color={colors.text}
        />
        <Text style={styles.infoText}>{appointment.type}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const AppointmentDetails = ({
  appointment,
  doctor,
  onClose,
  onReschedule,
  onCancel,
}) => (
  <View style={styles.detailsContainer}>
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Appointment Information</Text>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Booking ID</Text>
        <Text style={styles.infoValue}>{appointment.bookingId}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Symptoms</Text>
        <Text style={styles.infoValue}>{appointment.symptoms}</Text>
      </View>
      {appointment.status === "Completed" && (
        <>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Diagnosis</Text>
            <Text style={styles.infoValue}>{appointment.diagnosis}</Text>
          </View>
          {appointment.followUpNeeded && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Follow-up Date</Text>
              <Text style={styles.infoValue}>{appointment.followUpDate}</Text>
            </View>
          )}
        </>
      )}
    </View>

    {appointment.status !== "Completed" && (
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.rescheduleButton]}
          onPress={onReschedule}
        >
          <Feather
            name="calendar"
            size={responsive.wp(5)}
            color={colors.primary}
          />
          <Text style={styles.rescheduleText}>Reschedule</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.cancelButton]}
          onPress={onCancel}
        >
          <Feather
            name="x-circle"
            size={responsive.wp(5)}
            color={colors.error}
          />
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
);

const Appointments = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleAppointmentPress = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetails(true);
  };

  const getDoctor = (doctorId) => {
    return doctorsData.find((doc) => doc.id === doctorId);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={[styles.header, { flexDirection: "row" }]}>
        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
          }}
          onPress={() => {
            router.back();
          }}
        >
          <Feather
            name="chevron-left"
            size={responsive.wp(6)}
            color={colors.text}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Appointments</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "upcoming" && styles.activeTab]}
          onPress={() => setActiveTab("upcoming")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "upcoming" && styles.activeTabText,
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "past" && styles.activeTab]}
          onPress={() => setActiveTab("past")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "past" && styles.activeTabText,
            ]}
          >
            Past
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {myAppointments[activeTab].map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            doctor={getDoctor(appointment.doctorId)}
            onPress={() => handleAppointmentPress(appointment)}
          />
        ))}
      </ScrollView>

      <BottomSlideModal
        isVisible={showDetails}
        onClose={() => {
          setShowDetails(false);
          setSelectedAppointment(null);
        }}
        title={
          selectedAppointment
            ? getDoctor(selectedAppointment.doctorId)?.name
            : ""
        }
        subtitle={
          selectedAppointment
            ? getDoctor(selectedAppointment.doctorId)?.specialty
            : ""
        }
        showButton={false}
      >
        {selectedAppointment && (
          <AppointmentDetails
            appointment={selectedAppointment}
            doctor={getDoctor(selectedAppointment.doctorId)}
            onClose={() => setShowDetails(false)}
            onReschedule={() => {
              console.log("Reschedule appointment:", selectedAppointment.id);
              setShowDetails(false);
            }}
            onCancel={() => {
              console.log("Cancel appointment:", selectedAppointment.id);
              setShowDetails(false);
            }}
          />
        )}
      </BottomSlideModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: responsive.wp(4),
    backgroundColor: colors.surface,
  },
  title: {
    fontSize: responsive.wp(5),
    fontWeight: "600",
    color: colors.text,
  },
  tabContainer: {
    flexDirection: "row",
    padding: responsive.wp(4),
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  tab: {
    flex: 1,
    paddingVertical: responsive.hp(1.5),
    alignItems: "center",
    marginHorizontal: responsive.wp(2),
    borderRadius: responsive.wp(2),
  },
  activeTab: {
    backgroundColor: colors.primaryAlpha(0.1),
  },
  tabText: {
    fontSize: responsive.wp(3.5),
    color: colors.text,
    fontWeight: "500",
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: responsive.wp(4),
  },
  appointmentCard: {
    backgroundColor: colors.surface,
    borderRadius: responsive.wp(3),
    padding: responsive.wp(4),
    marginBottom: responsive.hp(2),
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: responsive.hp(2),
  },
  doctorInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: responsive.wp(12),
    height: responsive.wp(12),
    borderRadius: responsive.wp(6),
    backgroundColor: colors.primaryAlpha(0.1),
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    marginLeft: responsive.wp(3),
  },
  doctorName: {
    fontSize: responsive.wp(3.8),
    fontWeight: "600",
    color: colors.text,
  },
  specialty: {
    fontSize: responsive.wp(3.2),
    color: colors.text,
    opacity: 0.7,
  },
  statusBadge: {
    paddingVertical: responsive.hp(0.5),
    paddingHorizontal: responsive.wp(3),
    borderRadius: responsive.wp(2),
  },
  statusText: {
    fontSize: responsive.wp(3.2),
    fontWeight: "500",
  },
  cardContent: {
    gap: responsive.hp(1),
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: responsive.wp(2),
  },
  infoText: {
    fontSize: responsive.wp(3.5),
    color: colors.text,
  },
  detailsContainer: {
    gap: responsive.hp(2),
    paddingBottom: responsive.hp(4),
  },
  sectionContainer: {
    backgroundColor: colors.surface,
    borderRadius: responsive.wp(2.5),
    padding: responsive.wp(4),
    borderWidth: 1,
    borderColor: colors.background,
  },
  sectionTitle: {
    fontSize: responsive.wp(4),
    fontWeight: "600",
    color: colors.text,
    marginBottom: responsive.hp(2),
  },
  infoLabel: {
    fontSize: responsive.wp(3.2),
    color: colors.text,
    opacity: 0.7,
  },
  infoValue: {
    fontSize: responsive.wp(3.5),
    color: colors.text,
    marginTop: responsive.hp(0.5),
  },
  actionsContainer: {
    flexDirection: "row",
    gap: responsive.wp(3),
    // paddingBottom: responsive.hp(4),
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: responsive.hp(1.5),
    borderRadius: responsive.wp(2),
    gap: responsive.wp(2),
  },
  rescheduleButton: {
    backgroundColor: colors.primaryAlpha(0.1),
  },
  cancelButton: {
    backgroundColor: colors.errorAlpha(0.1),
  },
  rescheduleText: {
    fontSize: responsive.wp(3.5),
    fontWeight: "500",
    color: colors.primary,
  },
  cancelText: {
    fontSize: responsive.wp(3.5),
    fontWeight: "500",
    color: colors.error,
  },
});

export default Appointments;
