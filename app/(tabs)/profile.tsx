import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, ShoppingBag, Package, Gift, CreditCard, MapPin, Bell, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+94 71 234 5678',
    loyaltyPoints: 1250,
    profileImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800',
  };

  const handleLogout = () => {
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#0A2463" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userContact}>{user.email}</Text>
            <Text style={styles.userContact}>{user.phone}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.loyaltySection}>
          <View style={styles.loyaltyHeader}>
            <Gift size={24} color="#F9A826" />
            <Text style={styles.loyaltyTitle}>Loyalty Points</Text>
          </View>
          <Text style={styles.loyaltyPoints}>{user.loyaltyPoints}</Text>
          <TouchableOpacity 
            style={styles.viewHistoryButton}
            onPress={() => router.push('/loyalty')}
          >
            <Text style={styles.viewHistoryButtonText}>View Points History</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>My Orders</Text>
        </View>

        <View style={styles.ordersContainer}>
          <TouchableOpacity style={styles.orderTypeButton}>
            <Package size={24} color="#0A2463" />
            <Text style={styles.orderTypeText}>All</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.orderTypeButton}>
            <ShoppingBag size={24} color="#F9A826" />
            <Text style={styles.orderTypeText}>Pending</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.orderTypeButton}>
            <Package size={24} color="#4ECDC4" />
            <Text style={styles.orderTypeText}>Delivered</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.orderTypeButton}>
            <Package size={24} color="#FF6B6B" />
            <Text style={styles.orderTypeText}>Cancelled</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Settings</Text>
        </View>

        <View style={styles.settingsContainer}>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <CreditCard size={20} color="#0A2463" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingText}>Payment Methods</Text>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <MapPin size={20} color="#0A2463" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingText}>Shipping Addresses</Text>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Bell size={20} color="#0A2463" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingText}>Push Notifications</Text>
            </View>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: '#E1E1E1', true: '#4ECDC4' }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Bell size={20} color="#0A2463" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingText}>Email Notifications</Text>
            </View>
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              trackColor={{ false: '#E1E1E1', true: '#4ECDC4' }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <HelpCircle size={20} color="#0A2463" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingText}>Help & Support</Text>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#FF6B6B" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>SmartShop v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#0A2463',
  },
  settingsButton: {
    padding: 8,
  },
  scrollContent: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 16,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#0A2463',
    marginBottom: 4,
  },
  userContact: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  editButton: {
    padding: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  editButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#0A2463',
  },
  loyaltySection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  loyaltyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  loyaltyTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#0A2463',
    marginLeft: 8,
  },
  loyaltyPoints: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#F9A826',
    marginBottom: 16,
  },
  viewHistoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFF8E6',
    borderRadius: 8,
  },
  viewHistoryButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#F9A826',
  },
  sectionTitle: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitleText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#0A2463',
  },
  ordersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 24,
  },
  orderTypeButton: {
    alignItems: 'center',
  },
  orderTypeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#0A2463',
    marginTop: 4,
  },
  settingsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  settingIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  settingContent: {
    flex: 1,
    marginLeft: 8,
  },
  settingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#0A2463',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE5E5',
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  logoutButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FF6B6B',
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  versionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#999',
  },
});