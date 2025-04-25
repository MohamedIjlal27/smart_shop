import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { X, Store, ShoppingBag } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface RedeemPointsModalProps {
  visible: boolean;
  onClose: () => void;
  availablePoints: number;
}

const { width } = Dimensions.get('window');

export default function RedeemPointsModal({ visible, onClose, availablePoints }: RedeemPointsModalProps) {
  const router = useRouter();

  const handleInStoreRedeem = () => {
    onClose();
    router.push('/scanner');
  };

  const handleOnlineRedeem = () => {
    onClose();
    router.push('/(tabs)/cart');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Redeem Points</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <Text style={styles.availablePoints}>
            Available Points: <Text style={styles.pointsValue}>{availablePoints}</Text>
          </Text>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={handleInStoreRedeem}
            >
              <Store size={24} color="#0A2463" />
              <Text style={styles.optionTitle}>In-Store Purchase</Text>
              <Text style={styles.optionDescription}>
                Scan QR code at checkout to redeem points
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={handleOnlineRedeem}
            >
              <ShoppingBag size={24} color="#0A2463" />
              <Text style={styles.optionTitle}>Online Purchase</Text>
              <Text style={styles.optionDescription}>
                Apply points during checkout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width - 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#0A2463',
  },
  closeButton: {
    padding: 4,
  },
  availablePoints: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  pointsValue: {
    fontFamily: 'Poppins-Bold',
    color: '#F9A826',
  },
  optionsContainer: {
    gap: 16,
  },
  optionButton: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E1E1E1',
  },
  optionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#0A2463',
    marginTop: 8,
    marginBottom: 4,
  },
  optionDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
  },
}); 