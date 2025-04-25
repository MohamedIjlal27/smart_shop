import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Gift, ArrowLeft, ChevronRight, ShoppingBag, Ticket } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function LoyaltyScreen() {
  const router = useRouter();
  
  // Mock data - In a real app, this would come from an API
  const pointsData = {
    totalPoints: 1250,
    pointsToNextTier: 750,
    currentTier: 'Silver',
    nextTier: 'Gold',
    history: [
      {
        id: '1',
        type: 'earned',
        points: 150,
        description: 'Purchase at SmartShop',
        date: '2024-03-15',
        orderAmount: 15000,
      },
      {
        id: '2',
        type: 'redeemed',
        points: 100,
        description: 'Discount applied',
        date: '2024-03-10',
        orderAmount: 10000,
      },
      // Add more history items as needed
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#0A2463" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Loyalty Points</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Points Summary Card */}
        <View style={styles.pointsCard}>
          <View style={styles.pointsHeader}>
            <Gift size={24} color="#F9A826" />
            <Text style={styles.pointsTitle}>Available Points</Text>
          </View>
          <Text style={styles.pointsAmount}>{pointsData.totalPoints}</Text>
          <View style={styles.tierProgress}>
            <Text style={styles.tierText}>
              {pointsData.pointsToNextTier} points to {pointsData.nextTier}
            </Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '60%' }]} />
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <ShoppingBag size={24} color="#0A2463" />
            <Text style={styles.actionText}>Redeem Points</Text>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ticket size={24} color="#0A2463" />
            <Text style={styles.actionText}>Available Rewards</Text>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Points History */}
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Points History</Text>
          {pointsData.history.map((item) => (
            <View key={item.id} style={styles.historyItem}>
              <View style={styles.historyLeft}>
                <Text style={styles.historyType}>
                  {item.type === 'earned' ? '+ ' : '- '}
                  {item.points} points
                </Text>
                <Text style={styles.historyDescription}>{item.description}</Text>
                <Text style={styles.historyDate}>{item.date}</Text>
              </View>
              <Text style={styles.historyAmount}>
                LKR {item.orderAmount.toLocaleString()}
              </Text>
            </View>
          ))}
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
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#0A2463',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  pointsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  pointsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pointsTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#0A2463',
    marginLeft: 8,
  },
  pointsAmount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 36,
    color: '#0A2463',
    marginBottom: 16,
  },
  tierProgress: {
    marginTop: 8,
  },
  tierText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#F5F5F5',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F9A826',
    borderRadius: 3,
  },
  actionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  actionText: {
    flex: 1,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#0A2463',
    marginLeft: 12,
  },
  historyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  historyTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#0A2463',
    marginBottom: 16,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  historyLeft: {
    flex: 1,
  },
  historyType: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#0A2463',
    marginBottom: 4,
  },
  historyDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  historyDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#999',
  },
  historyAmount: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#666',
    marginLeft: 16,
  },
}); 