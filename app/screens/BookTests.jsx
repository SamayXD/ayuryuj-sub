import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { colors } from "../utils/colors";
import { responsive } from "../utils/basicUtils";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import BottomSlideModal from "../components/BottomSlideModal";

const TestCard = ({ icon, title, description, price, onPress }) => (
  <TouchableOpacity style={styles.testCard} onPress={onPress}>
    <View style={styles.testIconContainer}>
      <Feather name={icon} size={responsive.wp(6)} color={colors.primary} />
    </View>
    <View style={styles.testInfo}>
      <Text style={styles.testTitle}>{title}</Text>
      <Text style={styles.testDescription}>{description}</Text>
      <Text style={styles.testPrice}>₹{price}</Text>
    </View>
    <Feather name="chevron-right" size={responsive.wp(6)} color={colors.text} />
  </TouchableOpacity>
);

const CategoryChip = ({ label, active, onPress }) => (
  <TouchableOpacity
    style={[styles.categoryChip, active && styles.activeChip]}
    onPress={onPress}
  >
    <Text style={[styles.chipText, active && styles.activeChipText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const testPackages = {
  blood: [
    {
      id: "blood1",
      icon: "droplet",
      title: "Complete Blood Count",
      description: "Includes 25 important parameters",
      price: 599,
      details: {
        parameters: [
          "Hemoglobin",
          "RBC Count",
          "WBC Count",
          "Platelet Count",
          "Hematocrit",
        ],
        preparation: "Fasting for 8-12 hours required",
        reportTime: "24 hours",
        sampleType: "Blood",
      },
    },
    // Add more blood tests...
  ],
  diabetes: [
    {
      id: "diabetes1",
      icon: "activity",
      title: "Diabetes Screening",
      description: "Complete diabetes risk assessment",
      price: 799,
      details: {
        parameters: [
          "Fasting Blood Sugar",
          "PP Blood Sugar",
          "HbA1c",
          "Insulin",
        ],
        preparation: "Fasting for 12 hours required",
        reportTime: "24 hours",
        sampleType: "Blood",
      },
    },
    // Add more diabetes tests...
  ],
  // Add other categories...
};

const TestDetails = ({ test }) => {
  if (!test?.details) {
    return (
      <View style={styles.detailsContainer}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Test Information</Text>
          <Text style={styles.infoText}>
            Detailed information for this test is not available at the moment.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.detailsContainer}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Test Parameters</Text>
        {test.details.parameters?.map((param, index) => (
          <View key={index} style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.infoText}>{param}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Test Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Preparation</Text>
          <Text style={styles.infoValue}>{test.details.preparation}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Report Time</Text>
          <Text style={styles.infoValue}>{test.details.reportTime}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Sample Type</Text>
          <Text style={styles.infoValue}>{test.details.sampleType}</Text>
        </View>
      </View>
    </View>
  );
};

const BookTests = () => {
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedTest, setSelectedTest] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const categories = [
    { id: "all", label: "All Tests" },
    { id: "blood", label: "Blood Tests" },
    { id: "diabetes", label: "Diabetes" },
    { id: "thyroid", label: "Thyroid" },
    { id: "heart", label: "Heart" },
  ];

  const popularTests = [
    {
      id: 1,
      icon: "activity",
      title: "Complete Blood Count",
      description: "Includes 25 important parameters",
      price: 599,
      details: {
        parameters: [
          "Hemoglobin",
          "RBC Count",
          "WBC Count",
          "Platelet Count",
          "Hematocrit",
        ],
        preparation: "Fasting for 8-12 hours required",
        reportTime: "24 hours",
        sampleType: "Blood",
      },
    },
    {
      id: 2,
      icon: "droplet",
      title: "Diabetes Screening",
      description: "Fasting & PP Blood Sugar with HbA1c",
      price: 799,
    },
    {
      id: 3,
      icon: "heart",
      title: "Heart Health Package",
      description: "Lipid Profile & ECG",
      price: 1299,
    },
  ];

  const filteredTests = React.useMemo(() => {
    if (activeCategory === "all") {
      return popularTests;
    }
    return testPackages[activeCategory] || [];
  }, [activeCategory]);

  const handleTestSelect = (test) => {
    setSelectedTest(test);
    setShowDetails(true);
  };

  const handleBookTest = (test) => {
    console.log("Booking test:", test);
    setShowDetails(false);
    setSelectedTest(null);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather
            name="chevron-left"
            size={responsive.wp(6)}
            color={colors.text}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Book Lab Tests</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchBox}>
          <Feather name="search" size={20} color={colors.text} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for tests, packages..."
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <CategoryChip
              key={category.id}
              label={category.label}
              active={activeCategory === category.id}
              onPress={() => setActiveCategory(category.id)}
            />
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Available Tests</Text>
        {filteredTests.map((test) => (
          <TestCard
            key={test.id}
            {...test}
            onPress={() => handleTestSelect(test)}
          />
        ))}

        <Text style={styles.sectionTitle}>Health Packages</Text>
        <View style={styles.packageCard}>
          <View style={styles.packageHeader}>
            <Feather
              name="package"
              size={responsive.wp(6)}
              color={colors.primary}
            />
            <Text style={styles.packageTitle}>Complete Health Package</Text>
          </View>
          <Text style={styles.packageDescription}>
            Comprehensive health checkup including blood tests, heart health,
            diabetes screening and more
          </Text>
          <View style={styles.packageFooter}>
            <View>
              <Text style={styles.packagePrice}>₹1,999</Text>
              <Text style={styles.packageValue}>Worth ₹3,500</Text>
            </View>
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.buttonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <BottomSlideModal
        isVisible={showDetails}
        onClose={() => {
          setShowDetails(false);
          setSelectedTest(null);
        }}
        title={selectedTest?.title}
        subtitle={`₹${selectedTest?.price}`}
        buttonText="Book Now"
        onButtonPress={() => handleBookTest(selectedTest)}
      >
        {selectedTest && <TestDetails test={selectedTest} />}
      </BottomSlideModal>
    </View>
  );
};

export default BookTests;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: responsive.wp(4),
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  backButton: {
    marginRight: responsive.wp(3),
  },
  title: {
    fontSize: responsive.wp(5),
    fontWeight: "600",
    color: colors.text,
  },
  content: {
    flex: 1,
    padding: responsive.wp(4),
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: responsive.wp(3),
    borderRadius: responsive.wp(2),
    gap: responsive.wp(2),
  },
  searchInput: {
    flex: 1,
    fontSize: responsive.wp(3.5),
    color: colors.text,
  },
  categoriesContainer: {
    marginVertical: responsive.hp(2),
  },
  categoriesContent: {
    paddingRight: responsive.wp(4),
    gap: responsive.wp(2),
  },
  categoryChip: {
    paddingVertical: responsive.hp(1),
    paddingHorizontal: responsive.wp(4),
    backgroundColor: colors.surface,
    borderRadius: responsive.wp(2),
    borderWidth: 1,
    borderColor: colors.background,
  },
  activeChip: {
    backgroundColor: colors.primaryAlpha(0.1),
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: responsive.wp(3.5),
    color: colors.text,
  },
  activeChipText: {
    color: colors.primary,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: responsive.wp(4),
    fontWeight: "600",
    color: colors.text,
    marginBottom: responsive.hp(2),
    marginTop: responsive.hp(1),
  },
  testCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: responsive.wp(4),
    backgroundColor: colors.surface,
    borderRadius: responsive.wp(3),
    marginBottom: responsive.hp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  testIconContainer: {
    width: responsive.wp(12),
    height: responsive.wp(12),
    borderRadius: responsive.wp(6),
    backgroundColor: colors.primaryAlpha(0.1),
    justifyContent: "center",
    alignItems: "center",
  },
  testInfo: {
    flex: 1,
    marginLeft: responsive.wp(3),
  },
  testTitle: {
    fontSize: responsive.wp(3.8),
    fontWeight: "600",
    color: colors.text,
    marginBottom: responsive.hp(0.5),
  },
  testDescription: {
    fontSize: responsive.wp(3.2),
    color: colors.text,
    opacity: 0.7,
    marginBottom: responsive.hp(0.5),
  },
  testPrice: {
    fontSize: responsive.wp(3.5),
    fontWeight: "600",
    color: colors.primary,
  },
  packageCard: {
    backgroundColor: colors.surface,
    borderRadius: responsive.wp(3),
    padding: responsive.wp(4),
    marginBottom: responsive.hp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  packageHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: responsive.hp(2),
    gap: responsive.wp(3),
  },
  packageTitle: {
    fontSize: responsive.wp(4),
    fontWeight: "600",
    color: colors.text,
    flex: 1,
  },
  packageDescription: {
    fontSize: responsive.wp(3.3),
    color: colors.text,
    opacity: 0.8,
    marginBottom: responsive.hp(2),
  },
  packageFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  packagePrice: {
    fontSize: responsive.wp(4),
    fontWeight: "600",
    color: colors.primary,
  },
  packageValue: {
    fontSize: responsive.wp(3.2),
    color: colors.text,
    opacity: 0.7,
    textDecorationLine: "line-through",
  },
  bookButton: {
    backgroundColor: colors.primary,
    paddingVertical: responsive.hp(1.2),
    paddingHorizontal: responsive.wp(4),
    borderRadius: responsive.wp(2),
  },
  buttonText: {
    color: colors.surface,
    fontSize: responsive.wp(3.5),
    fontWeight: "600",
  },
  detailsContainer: {
    gap: responsive.hp(2),
  },
  sectionContainer: {
    backgroundColor: colors.surface,
    borderRadius: responsive.wp(2.5),
    padding: responsive.wp(4),
    borderWidth: 1,
    borderColor: colors.background,
  },
  bulletPoint: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: responsive.hp(0.8),
  },
  bullet: {
    fontSize: responsive.wp(3.5),
    color: colors.primary,
    marginRight: responsive.wp(2),
  },
  infoText: {
    fontSize: responsive.wp(3.5),
    color: colors.text,
    flex: 1,
  },
  infoRow: {
    marginBottom: responsive.hp(1),
  },
  infoLabel: {
    fontSize: responsive.wp(3.2),
    color: colors.text,
    opacity: 0.7,
    marginBottom: responsive.hp(0.3),
  },
  infoValue: {
    fontSize: responsive.wp(3.5),
    color: colors.text,
  },
});
