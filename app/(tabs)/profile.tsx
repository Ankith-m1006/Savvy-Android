import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight, LogOut, CreditCard, MapPin, Bell, ShieldCheck, CircleHelp as HelpCircle, Settings } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock user data
const userData = {
  name: 'Ankith',
  email: 'ankithm113@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  memberSince: 'January 2025',
};

// Menu items
const menuItems = [
  {
    id: 'orders',
    title: 'My Orders',
    icon: <CreditCard size={22} color="#333" />,
    route: '/orders',
  },
  {
    id: 'addresses',
    title: 'Shipping Addresses',
    icon: <MapPin size={22} color="#333" />,
    route: '/addresses',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: <Bell size={22} color="#333" />,
    route: '/notifications',
    toggle: true,
  },
  {
    id: 'privacy',
    title: 'Privacy & Security',
    icon: <ShieldCheck size={22} color="#333" />,
    route: '/privacy',
  },
  {
    id: 'help',
    title: 'Help & Support',
    icon: <HelpCircle size={22} color="#333" />,
    route: '/help',
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: <Settings size={22} color="#333" />,
    route: '/settings',
  },
];

export default function ProfileScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleMenuItemPress = (route: string) => {
    // In a real app, this would navigate to the specified route
    alert(`Navigating to ${route}`);
  };

  const handleToggle = (id: string, value: boolean) => {
    if (id === 'notifications') {
      setNotificationsEnabled(value);
    }
  };

  const handleLogout = () => {
    // In a real app, this would handle the logout process
    alert('Logging out...');
  };

  const renderMenuItem = (item: typeof menuItems[0]) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => handleMenuItemPress(item.route)}
    >
      <View style={styles.menuItemLeft}>
        {item.icon}
        <Text style={styles.menuItemTitle}>{item.title}</Text>
      </View>
      {item.toggle ? (
        <Switch
          value={notificationsEnabled}
          onValueChange={(value) => handleToggle(item.id, value)}
          trackColor={{ false: '#E0E0E0', true: '#FF4785' }}
          thumbColor={'white'}
        />
      ) : (
        <ChevronRight size={20} color="#999" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <View style={styles.profileCard}>
          <Image source={{ uri: userData.avatar }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.userEmail}>{userData.email}</Text>
            <Text style={styles.memberSince}>Member since {userData.memberSince}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={[styles.statItem, styles.statItemBorder]}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>$1,248</Text>
            <Text style={styles.statLabel}>Spent</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <Text style={styles.menuSectionTitle}>Account Settings</Text>
          {menuItems.map(renderMenuItem)}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#FF4785" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#333',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#999',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  statItemBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#F0F0F0',
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  menuContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 16,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  menuSectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#333',
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#FF4785',
    marginLeft: 10,
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  versionText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#999',
  },
});