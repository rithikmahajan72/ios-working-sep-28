import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import GlobalBackButton from '../components/GlobalBackButton';

// Plus/Minus Icon Component
const ExpandIcon = ({ isExpanded }) => (
  <View style={styles.iconContainer}>
    {/* Horizontal line */}
    <View style={styles.horizontalLine} />
    {/* Vertical line - hidden when expanded */}
    {!isExpanded && <View style={styles.verticalLine} />}
  </View>
);

const FAQScreen = ({ navigation }) => {
  // First item is expanded by default as shown in Figma
  const [expandedItems, setExpandedItems] = useState({ 1: true });

  // FAQ Data matching the Figma design
  const faqData = [
    {
      id: 1,
      question: "WHAT DO I NEED TO KNOW BEFORE SIGNING UP TO THE YORAA MEMBERSHIP?",
      answer: "All your purchases in store and online are rewarded with points. To collect points in store, always remember to scan your membership ID via the H&M app. You can also earn points by completing your profile, earning you 20 points, by recycling your garments earning you 20 points, by bringing your own bag when you shop in-store earning you 5 points, and by inviting your friends to become members. You'll earn 50 points for every new member that completes their first purchase. Your points will be displayed on your membership account which can take up to 24 hours to update."
    },
    {
      id: 2,
      question: "FOR HOW LONG ARE MY POINTS VALID?",
      answer: "Your points are valid for 12 months from the date they were earned. After this period, they will expire and cannot be used for purchases. We recommend using your points regularly to ensure they don't expire."
    },
    {
      id: 3,
      question: "WHEN DO I REACH PLUS LEVEL?",
      answer: "You reach Plus level when you spend $200 or more in a calendar year. Once you achieve Plus status, you'll enjoy additional benefits such as free shipping, early access to sales, and exclusive member events."
    },
    {
      id: 4,
      question: "HOW DO BONUS VOUCHERS WORK?",
      answer: "Bonus vouchers are special rewards that you can earn through various activities like completing your profile, referring friends, or reaching spending milestones. These vouchers can be applied to your purchases for additional discounts."
    },
    {
      id: 5,
      question: "WHY HAVEN'T I RECEIVED MY BONUS VOUCHER YET?",
      answer: "Bonus vouchers typically take 24-48 hours to appear in your account after meeting the requirements. If you still haven't received it after this time, please contact our customer service team for assistance."
    },
    {
      id: 6,
      question: "HOW LONG WILL I KEEP THE PLUS STATUS?",
      answer: "Your Plus status is maintained for one full calendar year from the date you first achieved it. To maintain Plus status for the following year, you'll need to spend $200 or more again during that calendar year."
    }
  ];

  const toggleItem = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <GlobalBackButton />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQ</Text>
        <View style={styles.headerRight} />
      </View>

      {/* FAQ Content */}
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {faqData.map((item, index) => (
          <View key={item.id} style={styles.faqItem}>
            <TouchableOpacity 
              style={styles.questionContainer} 
              onPress={() => toggleItem(item.id)}
              accessibilityRole="button"
              accessibilityLabel={`Toggle FAQ: ${item.question}`}
              accessibilityState={{ expanded: expandedItems[item.id] }}
            >
              <Text style={styles.questionText}>{item.question}</Text>
              <ExpandIcon isExpanded={expandedItems[item.id]} />
            </TouchableOpacity>
            
            {expandedItems[item.id] && (
              <View style={styles.answerContainer}>
                <Text style={styles.answerText}>{item.answer}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 54,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 68,
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    letterSpacing: -0.4,
    fontFamily: 'Montserrat-Medium',
  },
  headerRight: {
    width: 68,
  },

  // Content Styles
  scrollView: {
    flex: 1,
    paddingHorizontal: 32,
  },
  scrollContentContainer: {
    paddingBottom: 100,
  },
  faqItem: {
    marginBottom: 16,
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingRight: 4,
  },
  questionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 16.8, // 1.2 line height
    flex: 1,
    marginRight: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  answerContainer: {
    marginTop: 8,
    paddingRight: 20,
  },
  answerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#848688',
    lineHeight: 16.8, // 1.2 line height
    fontFamily: 'Montserrat-Medium',
  },

  // Icon Styles
  iconContainer: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  horizontalLine: {
    width: 11,
    height: 1.5,
    backgroundColor: '#000000',
    borderRadius: 0.75,
  },
  verticalLine: {
    width: 1.5,
    height: 11,
    backgroundColor: '#000000',
    borderRadius: 0.75,
    position: 'absolute',
  },
});

export default FAQScreen;
