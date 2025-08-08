import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#f7f7f7',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4a4a4a',
    marginBottom: 24,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  label: {
    width: 110,
    fontWeight: '600',
    color: '#7a5af8', // pastel purple
  },
  value: {
    flex: 1,
    color: '#333',
  },
});

export default styles;
