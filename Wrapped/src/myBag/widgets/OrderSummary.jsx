import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OrderSummary = ({ order, delivery, summary }) => {
  return (
    <View style={styles.summary}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Order:</Text>
        <Text style={styles.summaryValue}>{order}$</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Delivery:</Text>
        <Text style={styles.summaryValue}>{delivery}$</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Summary:</Text>
        <Text style={styles.summaryTotal}>{summary}$</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summary: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#555",
  },
  summaryValue: {
    fontSize: 16,
    color: "#333",
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default OrderSummary;
