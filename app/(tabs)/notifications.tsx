import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Check, Trash2 } from 'lucide-react-native';
import NotificationItem from '../../components/NotificationItem';
import { notifications as mockNotifications } from '../../data/mockData';
import { Notification } from '../../types';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread' | 'promo' | 'order' | 'loyalty'>('all');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const markAsRead = (notification: Notification) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notification.id ? { ...n, read: true } : n
      )
    );
  };

  const filteredNotifications = () => {
    switch (selectedFilter) {
      case 'unread':
        return notifications.filter((n) => !n.read);
      case 'promo':
        return notifications.filter((n) => n.type === 'promo');
      case 'order':
        return notifications.filter((n) => n.type === 'order');
      case 'loyalty':
        return notifications.filter((n) => n.type === 'loyalty');
      default:
        return notifications;
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Bell size={48} color="#CCC" />
      <Text style={styles.emptyTitle}>No notifications</Text>
      <Text style={styles.emptyText}>
        You don't have any notifications at the moment.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.headerActions}>
          {unreadCount > 0 && (
            <TouchableOpacity style={styles.actionButton} onPress={markAllAsRead}>
              <Check size={18} color="#0A2463" />
            </TouchableOpacity>
          )}
          {notifications.length > 0 && (
            <TouchableOpacity style={styles.actionButton} onPress={clearAllNotifications}>
              <Trash2 size={18} color="#FF6B6B" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === 'all' && styles.selectedFilterButton,
            ]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === 'all' && styles.selectedFilterText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === 'unread' && styles.selectedFilterButton,
            ]}
            onPress={() => setSelectedFilter('unread')}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === 'unread' && styles.selectedFilterText,
              ]}
            >
              Unread
              {unreadCount > 0 && (
                <Text style={styles.badgeText}> ({unreadCount})</Text>
              )}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === 'promo' && styles.selectedFilterButton,
            ]}
            onPress={() => setSelectedFilter('promo')}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === 'promo' && styles.selectedFilterText,
              ]}
            >
              Promotions
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === 'order' && styles.selectedFilterButton,
            ]}
            onPress={() => setSelectedFilter('order')}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === 'order' && styles.selectedFilterText,
              ]}
            >
              Orders
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === 'loyalty' && styles.selectedFilterButton,
            ]}
            onPress={() => setSelectedFilter('loyalty')}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === 'loyalty' && styles.selectedFilterText,
              ]}
            >
              Loyalty
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <FlatList
        data={filteredNotifications()}
        renderItem={({ item }) => (
          <NotificationItem
            notification={item}
            onPress={(notification) => markAsRead(notification)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationsList}
        ListEmptyComponent={renderEmptyState}
      />
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
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  selectedFilterButton: {
    backgroundColor: '#0A2463',
  },
  filterText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#666',
  },
  selectedFilterText: {
    color: '#FFFFFF',
  },
  badgeText: {
    color: '#FF6B6B',
  },
  notificationsList: {
    padding: 16,
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    marginTop: 60,
  },
  emptyTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#0A2463',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});