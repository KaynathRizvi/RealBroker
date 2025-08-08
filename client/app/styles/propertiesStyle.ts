import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#fdf2f8ff', // soft pastel pink background
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdf2f8',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280', // neutral gray
  },
  card: {
    borderWidth: 1,
    borderColor: '#e9d5ff', // light purple border
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  imageScrollContainer: {
    marginBottom: 10,
  },
  thumbnailImage: {
    width: 120,
    height: 120,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dbeafe', // pastel blue border
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
    color: '#27245eff', // deep pastel blue
  },
  detail: {
    fontSize: 15,
    marginTop: 4,
    color: '#10b981', // pastel green
  },
  email: {
    fontSize: 14,
    marginTop: 4,
    color: '#525863ff', // gray
  },
});

export default styles;
