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
import { myProfile } from "../utils/mockData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";
import BottomSlideModal from "../components/BottomSlideModal";

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const EditProfileForm = ({ profile, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: profile.name,
    age: profile.age.toString(),
    height: profile.height,
    weight: profile.weight,
    phone: profile.phone,
    emergencyContact: {
      name: profile.emergencyContact.name,
      relation: profile.emergencyContact.relation,
      phone: profile.emergencyContact.phone,
    },
    address: {
      street: profile.address.street,
      area: profile.address.area,
      city: profile.address.city,
      pincode: profile.address.pincode,
    },
  });

  const handleSubmit = () => {
    onUpdate(formData);
  };

  const renderInput = (label, value, onChangeText, multiline = false) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
      />
    </View>
  );

  return (
    <View style={styles.formContainer}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Basic Information</Text>
        {renderInput("Name", formData.name, (text) =>
          setFormData((prev) => ({ ...prev, name: text }))
        )}
        {renderInput("Age", formData.age, (text) =>
          setFormData((prev) => ({ ...prev, age: text }))
        )}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Physical Details</Text>
        {renderInput("Height", formData.height, (text) =>
          setFormData((prev) => ({ ...prev, height: text }))
        )}
        {renderInput("Weight", formData.weight, (text) =>
          setFormData((prev) => ({ ...prev, weight: text }))
        )}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Emergency Contact</Text>
        {renderInput("Name", formData.emergencyContact.name, (text) =>
          setFormData((prev) => ({
            ...prev,
            emergencyContact: { ...prev.emergencyContact, name: text },
          }))
        )}
        {renderInput("Relation", formData.emergencyContact.relation, (text) =>
          setFormData((prev) => ({
            ...prev,
            emergencyContact: { ...prev.emergencyContact, relation: text },
          }))
        )}
        {renderInput("Phone", formData.emergencyContact.phone, (text) =>
          setFormData((prev) => ({
            ...prev,
            emergencyContact: { ...prev.emergencyContact, phone: text },
          }))
        )}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Address</Text>
        {renderInput("Street", formData.address.street, (text) =>
          setFormData((prev) => ({
            ...prev,
            address: { ...prev.address, street: text },
          }))
        )}
        {renderInput("Area", formData.address.area, (text) =>
          setFormData((prev) => ({
            ...prev,
            address: { ...prev.address, area: text },
          }))
        )}
        {renderInput("City", formData.address.city, (text) =>
          setFormData((prev) => ({
            ...prev,
            address: { ...prev.address, city: text },
          }))
        )}
        {renderInput("Pincode", formData.address.pincode, (text) =>
          setFormData((prev) => ({
            ...prev,
            address: { ...prev.address, pincode: text },
          }))
        )}
      </View>
    </View>
  );
};

const Profile = () => {
  const insets = useSafeAreaInsets();
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileData, setProfileData] = useState(myProfile);

  const handleUpdateProfile = (updatedData) => {
    setProfileData(updatedData);
    setShowEditModal(false);
    // Here you would typically make an API call to update the profile
    console.log("Profile updated:", updatedData);
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setShowEditModal(true)}
        >
          <Feather
            name="edit-2"
            size={responsive.wp(5)}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* ID Card Section */}
        <View style={styles.idCard}>
          <View style={styles.avatarContainer}>
            <Feather
              name="user"
              size={responsive.wp(12)}
              color={colors.primary}
            />
          </View>

          <Text style={styles.name}>{profileData.name}</Text>
          <View style={styles.basicInfo}>
            <View style={styles.basicInfoItem}>
              <Text style={styles.basicInfoLabel}>Age</Text>
              <Text style={styles.basicInfoValue}>{profileData.age}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.basicInfoItem}>
              <Text style={styles.basicInfoLabel}>Blood Group</Text>
              <Text style={styles.basicInfoValue}>
                {profileData.bloodGroup}
              </Text>
            </View>
          </View>
        </View>

        {/* Wallet Card */}
        <View style={styles.walletCard}>
          <View style={styles.walletHeader}>
            <Feather
              name="credit-card"
              size={responsive.wp(6)}
              color={colors.primary}
            />
            <Text style={styles.walletTitle}>Wallet Balance</Text>
          </View>
          <Text style={styles.walletBalance}>₹{profileData.wallet}</Text>
        </View>

        {/* Details Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Physical Details</Text>
          <InfoRow label="Height" value={profileData.height} />
          <InfoRow label="Weight" value={profileData.weight} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical Information</Text>
          <InfoRow
            label="Allergies"
            value={
              profileData.allergies.length
                ? profileData.allergies.join(", ")
                : "None"
            }
          />
          <InfoRow
            label="Chronic Conditions"
            value={
              profileData.chronicConditions.length
                ? profileData.chronicConditions.join(", ")
                : "None"
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          <InfoRow label="Name" value={profileData.emergencyContact.name} />
          <InfoRow
            label="Relation"
            value={profileData.emergencyContact.relation}
          />
          <InfoRow label="Phone" value={profileData.emergencyContact.phone} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          <InfoRow label="Street" value={profileData.address.street} />
          <InfoRow label="Area" value={profileData.address.area} />
          <InfoRow label="City" value={profileData.address.city} />
          <InfoRow label="Pincode" value={profileData.address.pincode} />
        </View>
      </ScrollView>

      <BottomSlideModal
        isVisible={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Profile"
        buttonText="Save Changes"
        onButtonPress={() => {
          // handleUpdateProfile(formData)
          setShowEditModal(false);
        }}
      >
        <EditProfileForm profile={profileData} onUpdate={handleUpdateProfile} />
      </BottomSlideModal>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: responsive.wp(4),
    backgroundColor: colors.surface,
  },
  title: {
    fontSize: responsive.wp(5),
    fontWeight: "600",
    color: colors.text,
  },
  editButton: {
    padding: responsive.wp(2),
  },
  content: {
    flex: 1,
    padding: responsive.wp(4),
  },
  idCard: {
    backgroundColor: colors.surface,
    borderRadius: responsive.wp(4),
    padding: responsive.wp(4),
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  avatarContainer: {
    width: responsive.wp(24),
    height: responsive.wp(24),
    borderRadius: responsive.wp(12),
    backgroundColor: colors.primaryAlpha(0.1),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: responsive.hp(2),
  },
  name: {
    fontSize: responsive.wp(5),
    fontWeight: "600",
    color: colors.text,
    marginBottom: responsive.hp(2),
  },
  basicInfo: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  basicInfoItem: {
    flex: 1,
    alignItems: "center",
  },
  basicInfoLabel: {
    fontSize: responsive.wp(3.2),
    color: colors.text,
    opacity: 0.7,
    marginBottom: responsive.hp(0.5),
  },
  basicInfoValue: {
    fontSize: responsive.wp(4),
    fontWeight: "600",
    color: colors.primary,
  },
  divider: {
    width: 1,
    height: responsive.hp(6),
    backgroundColor: colors.background,
  },
  walletCard: {
    backgroundColor: colors.surface,
    borderRadius: responsive.wp(3),
    padding: responsive.wp(4),
    marginTop: responsive.hp(2),
  },
  walletHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: responsive.wp(2),
    marginBottom: responsive.hp(1),
  },
  walletTitle: {
    fontSize: responsive.wp(3.5),
    color: colors.text,
    fontWeight: "500",
  },
  walletBalance: {
    fontSize: responsive.wp(6),
    fontWeight: "600",
    color: colors.primary,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: responsive.wp(3),
    padding: responsive.wp(4),
    marginTop: responsive.hp(2),
  },
  sectionTitle: {
    fontSize: responsive.wp(4),
    fontWeight: "600",
    color: colors.text,
    marginBottom: responsive.hp(2),
  },
  infoRow: {
    marginBottom: responsive.hp(1.5),
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
  formContainer: {
    gap: responsive.hp(2),
  },
  inputContainer: {
    marginBottom: responsive.hp(2),
  },
  inputLabel: {
    fontSize: responsive.wp(3.2),
    color: colors.text,
    opacity: 0.7,
    marginBottom: responsive.hp(0.5),
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: responsive.wp(2),
    padding: responsive.wp(3),
    fontSize: responsive.wp(3.5),
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.background,
  },
  multilineInput: {
    height: responsive.hp(10),
    textAlignVertical: "top",
  },
  sectionContainer: {
    backgroundColor: colors.surface,
    borderRadius: responsive.wp(3),
    padding: responsive.wp(4),
    marginBottom: responsive.hp(2),
  },
});
