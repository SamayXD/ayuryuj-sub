import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { colors } from "../utils/colors";
import { responsive } from "../utils/basicUtils";
import { doctorsData, specialties } from "../utils/mockData";
import ReactNativeModal from "react-native-modal";
import DoctorCard from "../components/DoctorCard"; // Import the DoctorCard component
import BottomSlideModal from "../components/BottomSlideModal";

// Add these constants at the top of the file
const sortOptions = [
  { id: "price_low", label: "Price: Low to High" },
  { id: "price_high", label: "Price: High to Low" },
  { id: "exp_high", label: "Experience: Most" },
  { id: "rating", label: "Rating" },
];

const filterOptions = [
  { id: "available", label: "Available Today" },
  { id: "price_1000", label: "Under ₹1000" },
  { id: "exp_10", label: "Experience 10+ years" },
];

const DoctorDetails = ({ doctor }) => {
  const sections = [
    { icon: "user", title: "About", content: doctor?.about },
    {
      icon: "book-open",
      title: "Education",
      content: doctor?.education,
      isList: true,
    },
    {
      icon: "home",
      title: "Hospital",
      content: doctor?.hospitalAffiliation,
    },
    {
      icon: "award",
      title: "Awards",
      content: doctor?.awards,
      isList: true,
    },
  ];

  return (
    <View style={styles.detailsContainer}>
      {sections.map((section, index) => (
        <View key={index} style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Feather
              name={section.icon}
              size={responsive.wp(5)}
              color={colors.primary}
            />
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>

          {section.isList ? (
            section.content?.map((item, idx) => (
              <View key={idx} style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.infoText}>{item}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.infoText}>{section.content}</Text>
          )}
        </View>
      ))}
    </View>
  );
};

const DoctorListings = () => {
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Add to the DoctorListings component state
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortBy, setSortBy] = useState("rating");

  const filteredDoctors = doctorsData.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialty =
      !selectedSpecialty || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  // Add this function inside DoctorListings component
  const getSortedDoctors = (doctors) => {
    switch (sortBy) {
      case "price_low":
        return [...doctors].sort((a, b) => a.price - b.price);
      case "price_high":
        return [...doctors].sort((a, b) => b.price - a.price);
      case "exp_high":
        return [...doctors].sort((a, b) => b.experience - a.experience);
      case "rating":
        return [...doctors].sort((a, b) => b.rating - a.rating);
      default:
        return doctors;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBox}>
          <Feather name="search" size={20} color={colors.text} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors, specialties..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilters(true)}
          >
            <Feather
              name="sliders"
              size={responsive.wp(5)}
              color={colors.text}
            />
            <Text style={styles.filterButtonText}>
              {sortOptions.find((opt) => opt.id === sortBy)?.label ||
                "Filters & Sort"}
            </Text>
            {activeFilters.length > 0 && (
              <View style={styles.filterBadge}>
                <Text style={styles.filterBadgeText}>
                  {activeFilters.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.doctorList}
        contentContainerStyle={{ paddingBottom: responsive.hp(4) }}
        showsVerticalScrollIndicator={false}
      >
        {getSortedDoctors(filteredDoctors).map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onBook={() => {
              // Handle booking logic here
              console.log("Booking for doctor:", doctor.name);
            }}
            onKnowMore={() => {
              setSelectedDoctor(doctor);
              setIsModalVisible(true);
            }}
          />
        ))}
      </ScrollView>

      <ReactNativeModal
        isVisible={showFilters}
        onBackdropPress={() => setShowFilters(false)}
        style={styles.filterModal}
        backdropTransitionOutTiming={0} // Add this to fix flash
        animationOutTiming={300} // Optional: adjust animation speed
        useNativeDriver // Add this for better performance
      >
        <View style={styles.filterContent}>
          <View style={styles.filterHeader}>
            <Text style={styles.filterTitle}>Sort & Filter</Text>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Feather name="x" size={responsive.wp(6)} color={colors.text} />
            </TouchableOpacity>
          </View>

          <Text style={styles.filterSectionTitle}>Sort By</Text>
          <View style={styles.optionsGrid}>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionChip,
                  sortBy === option.id && styles.activeChip,
                ]}
                onPress={() => setSortBy(option.id)}
              >
                <Text
                  style={[
                    styles.optionText,
                    sortBy === option.id && styles.activeOptionText,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.filterSectionTitle}>Filter By</Text>
          <View style={styles.optionsGrid}>
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionChip,
                  activeFilters.includes(option.id) && styles.activeChip,
                ]}
                onPress={() => {
                  setActiveFilters((prev) =>
                    prev.includes(option.id)
                      ? prev.filter((id) => id !== option.id)
                      : [...prev, option.id]
                  );
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    activeFilters.includes(option.id) &&
                      styles.activeOptionText,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => setShowFilters(false)}
          >
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>

      <BottomSlideModal
        isVisible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setSelectedDoctor(null);
        }}
        title={selectedDoctor?.name}
        subtitle={selectedDoctor?.specialty}
        buttonText="Book Appointment"
        onButtonPress={() => {
          // Handle booking logic here
          console.log("Booking appointment with:", selectedDoctor?.name);
          setIsModalVisible(false);
          setSelectedDoctor(null);
        }}
      >
        <DoctorDetails doctor={selectedDoctor} />
      </BottomSlideModal>
    </View>
  );
};

export default DoctorListings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: responsive.wp(4),
    backgroundColor: colors.surface,
    gap: responsive.hp(2),
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: responsive.wp(3),
    borderRadius: responsive.wp(2),
    gap: responsive.wp(2),
  },
  searchInput: {
    flex: 1,
    fontSize: responsive.wp(3.5),
    color: colors.text,
  },
  filterRow: {
    flexDirection: "row",
  },
  filterButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    padding: responsive.hp(1.5),
    borderRadius: responsive.wp(2),
    gap: responsive.wp(2),
  },
  filterButtonText: {
    fontSize: responsive.wp(3.5),
    color: colors.text,
    fontWeight: "500",
    flex: 1, // Add this to ensure text wraps properly
  },
  filterBadge: {
    backgroundColor: colors.primary,
    borderRadius: responsive.wp(4),
    minWidth: responsive.wp(5),
    height: responsive.wp(5),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: responsive.wp(1),
  },
  filterBadgeText: {
    color: colors.surface,
    fontSize: responsive.wp(3),
    fontWeight: "600",
  },
  doctorList: {
    flex: 1,
    padding: responsive.wp(4),
    backgroundColor: colors.background,
  },
  detailsContainer: {
    gap: responsive.hp(1.5), // Reduced gap
  },
  sectionContainer: {
    backgroundColor: colors.surface,
    borderRadius: responsive.wp(2.5),
    padding: responsive.wp(3.5), // Slightly reduced padding
    borderWidth: 1,
    borderColor: colors.background,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        // elevation: 2,
      },
    }),
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: responsive.hp(1),
    paddingBottom: responsive.hp(0.8),
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  sectionTitle: {
    fontSize: responsive.wp(3.8),
    fontWeight: "600",
    color: colors.text,
    marginLeft: responsive.wp(2),
  },
  infoText: {
    fontSize: responsive.wp(3.3),
    color: colors.text,
    lineHeight: responsive.hp(2.5),
    opacity: 0.8,
  },
  bulletPoint: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: responsive.hp(0.3),
  },
  bullet: {
    fontSize: responsive.wp(3.3),
    color: colors.primary,
    marginRight: responsive.wp(2),
    marginTop: responsive.hp(0.2),
  },
  filterModal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  filterContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: responsive.wp(4),
    borderTopRightRadius: responsive.wp(4),
    padding: responsive.wp(4),
    paddingBottom: Platform.OS === "ios" ? responsive.hp(4) : responsive.hp(3),
  },
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: responsive.hp(3),
    paddingBottom: responsive.hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  filterTitle: {
    fontSize: responsive.wp(4.5),
    fontWeight: "600",
    color: colors.text,
  },
  filterSectionTitle: {
    fontSize: responsive.wp(3.8),
    fontWeight: "500",
    color: colors.text,
    marginBottom: responsive.hp(1.5),
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: responsive.wp(2),
    marginBottom: responsive.hp(3),
  },
  optionChip: {
    paddingVertical: responsive.hp(1),
    paddingHorizontal: responsive.wp(3),
    borderRadius: responsive.wp(2),
    borderWidth: 1,
    borderColor: colors.background,
    backgroundColor: colors.background,
  },
  activeChip: {
    backgroundColor: colors.primaryAlpha(0.1),
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: responsive.wp(3.3),
    color: colors.text,
  },
  activeOptionText: {
    color: colors.primary,
    fontWeight: "500",
  },
  applyButton: {
    backgroundColor: colors.primary,
    padding: responsive.hp(1.8),
    borderRadius: responsive.wp(2),
    alignItems: "center",
    justifyContent: "center",
    marginTop: responsive.hp(2),
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5,
  },
  applyButtonText: {
    color: colors.surface,
    fontSize: responsive.wp(4),
    fontWeight: "600",
  },
});
