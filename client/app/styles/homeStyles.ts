import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f7fa', // light background
  },
  dashboardContainer: {
    gap: 20,
    marginTop: 10,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  subscriptionCard: {
    backgroundColor: '#e0f7e9', // light green
    borderLeftColor: "#75a989ff",
    borderLeftWidth: 4,
  },
  requestCard: {
    backgroundColor: '#e8f1ff', // light blue
    borderLeftColor: "#7d92b4ff",
    borderLeftWidth: 4,
  },
  sentCard: {
    backgroundColor: '#fff2e5', // light orange
    borderLeftColor: "#e3b383ff",
    borderLeftWidth: 4,
  },
  statsCard: {
    backgroundColor: "#fbf0f9ff",
    borderLeftColor: "#d2a9caff",
    borderLeftWidth: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#333',
  },
  cardButton: {
    marginTop: 10,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e1e1e',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },

})

export default homeStyles;
