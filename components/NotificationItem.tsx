import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BellRing, ShoppingBag, Gift, Info } from 'lucide-react-native';
import { Notification } from '../types';

interface NotificationItemProps {
  notification: Notification;
  onPress: (notification: Notification) => void;
}

export default function NotificationItem({ notification, onPress }: NotificationItemProps) {
  const getIconForType = () => {
    switch (notification.type) {
      case 'promo':
        return <Gift size={24} color="#FF6B6B" />;
      case 'order':
        return <ShoppingBag size={24} color="#4ECDC4" />;
      case 'loyalty':
        return <Gift size={24} color="#F9A826" />;
      case 'system':
        return <Info size={24} color="#0A2463" />;
      default:
        return <BellRing size={24} color="#0A2463" />;
    }
  };

  const getBackgroundColor = () => {
    if (!notification.read) {
      return '#F5F9FF';
    }
    return '#FFFFFF';
  };

  // Format date to show relative time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    const diffDay = Math.round(diffHour / 24);

    if (diffSec < 60) {
      return 'Just now';
    } else if (diffMin < 60) {
      return `${diffMin} min ago`;
    } else if (diffHour < 24) {
      return `${diffHour} hours ago`;
    } else if (diffDay < 7) {
      return `${diffDay} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: getBackgroundColor() }]}
      onPress={() => onPress(notification)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>{getIconForType()}</View>
      
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.time}>{formatDate(notification.createdAt)}</Text>
        </View>
        
        <Text style={styles.message} numberOfLines={2}>
          {notification.message}
        </Text>
      </View>
      
      {!notification.read && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  iconContainer: {
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#0A2463',
  },
  time: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#999',
  },
  message: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
    marginLeft: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
});