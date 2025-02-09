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
import { myReports } from "../utils/mockData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import BottomSlideModal from "../components/BottomSlideModal";

const ReportDetails = ({ report, type }) => {
  const renderContent = () => {
    switch (type) {
      case "medical":
        return (
          <View style={styles.detailsContainer}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Test Information</Text>
              <Text style={styles.infoText}>
                Laboratory: {report.laboratory}
              </Text>
              <Text style={styles.infoText}>Type: {report.type}</Text>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Key Findings</Text>
              {report.keyFindings.map((finding, index) => (
                <View key={index} style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.infoText}>{finding}</Text>
                </View>
              ))}
            </View>
          </View>
        );

      case "imaging":
        return (
          <View style={styles.detailsContainer}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Scan Information</Text>
              <Text style={styles.infoText}>Facility: {report.facility}</Text>
              <Text style={styles.infoText}>Type: {report.type}</Text>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Findings</Text>
              <Text style={styles.infoText}>{report.findings}</Text>
            </View>
          </View>
        );

      case "prescriptions":
        return (
          <View style={styles.detailsContainer}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Medications</Text>
              {report.medications.map((med, index) => (
                <View key={index} style={styles.medicationItem}>
                  <Text style={styles.medName}>{med.name}</Text>
                  <Text style={styles.medDetails}>
                    {med.dosage} • {med.frequency}
                  </Text>
                  <Text style={styles.medDuration}>
                    Duration: {med.duration}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Instructions</Text>
              <Text style={styles.infoText}>{report.instructions}</Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return renderContent();
};

const ReportCard = ({ report, type, onPress }) => {
  const getIcon = () => {
    switch (type) {
      case "medical":
        return "activity";
      case "imaging":
        return "image";
      case "prescriptions":
        return "file-text";
      default:
        return "file";
    }
  };

  return (
    <TouchableOpacity style={styles.reportCard} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Feather
          name={getIcon()}
          size={responsive.wp(6)}
          color={colors.primary}
        />
      </View>
      <View style={styles.reportInfo}>
        <Text style={styles.reportName}>{report.name}</Text>
        <Text style={styles.reportDate}>{report.date}</Text>
        <Text
          style={[
            styles.reportStatus,
            report.status === "Normal" && styles.normalStatus,
          ]}
        >
          {report.status}
        </Text>
      </View>
      <Feather
        name="chevron-right"
        size={responsive.wp(6)}
        color={colors.text}
      />
    </TouchableOpacity>
  );
};

const Reports = () => {
  const [activeTab, setActiveTab] = useState("medical");
  const insets = useSafeAreaInsets();
  const tabs = [
    { id: "medical", label: "Medical Tests" },
    { id: "imaging", label: "Imaging" },
    { id: "prescriptions", label: "Prescriptions" },
  ];
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
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
        <Text style={styles.title}>Reports</Text>
      </View>

      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {myReports[activeTab]?.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            type={activeTab}
            onPress={() => {
              setSelectedReport(report);
              setShowDetails(true);
            }}
          />
        ))}
      </ScrollView>

      <BottomSlideModal
        isVisible={showDetails}
        onClose={() => {
          setShowDetails(false);
          setSelectedReport(null);
        }}
        title={selectedReport?.name}
        subtitle={selectedReport?.date}
        showButton={false}
      >
        {selectedReport && (
          <ReportDetails report={selectedReport} type={activeTab} />
        )}
      </BottomSlideModal>
    </View>
  );
};

export default Reports;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: responsive.wp(4),
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
    flexDirection: "row",
  },
  title: {
    fontSize: responsive.wp(5),
    fontWeight: "600",
    color: colors.text,
  },
  tabContainer: {
    flexDirection: "row",
    padding: responsive.wp(4),
    gap: responsive.wp(3),
    backgroundColor: colors.surface,
    justifyContent: "space-around",
  },
  tab: {
    paddingVertical: responsive.hp(1),
    paddingHorizontal: responsive.wp(4),
    borderRadius: responsive.wp(2),
    backgroundColor: colors.background,
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
  reportCard: {
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
  iconContainer: {
    width: responsive.wp(12),
    height: responsive.wp(12),
    borderRadius: responsive.wp(6),
    backgroundColor: colors.primaryAlpha(0.1),
    justifyContent: "center",
    alignItems: "center",
  },
  reportInfo: {
    flex: 1,
    marginLeft: responsive.wp(3),
  },
  reportName: {
    fontSize: responsive.wp(3.8),
    fontWeight: "600",
    color: colors.text,
    marginBottom: responsive.hp(0.5),
  },
  reportDate: {
    fontSize: responsive.wp(3.2),
    color: colors.text,
    opacity: 0.7,
    marginBottom: responsive.hp(0.5),
  },
  reportStatus: {
    fontSize: responsive.wp(3.2),
    color: colors.accent,
    fontWeight: "500",
  },
  normalStatus: {
    color: colors.primary,
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
  sectionTitle: {
    fontSize: responsive.wp(4),
    fontWeight: "600",
    color: colors.text,
    marginBottom: responsive.hp(1.5),
  },
  infoText: {
    fontSize: responsive.wp(3.5),
    color: colors.text,
    lineHeight: responsive.hp(2.5),
    opacity: 0.8,
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
  medicationItem: {
    marginBottom: responsive.hp(2),
    padding: responsive.wp(3),
    backgroundColor: colors.background,
    borderRadius: responsive.wp(2),
  },
  medName: {
    fontSize: responsive.wp(3.8),
    fontWeight: "600",
    color: colors.text,
    marginBottom: responsive.hp(0.5),
  },
  medDetails: {
    fontSize: responsive.wp(3.3),
    color: colors.text,
    opacity: 0.8,
    marginBottom: responsive.hp(0.5),
  },
  medDuration: {
    fontSize: responsive.wp(3.3),
    color: colors.primary,
    fontWeight: "500",
  },
});
