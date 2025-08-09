import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Main container with padding and flex layout
  container: {
    padding: 20,
    flex: 1,
  },

  // Large title text centered at the top
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
  },

  // Section subtitles
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 25,
  },

  // Input fields styling
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db', // light gray border
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff', // white background
    fontSize: 16,
  },

  // List container spacing
  list: {
    marginBottom: 25,
  },

  // Property card container
  propertyCard: {
    borderWidth: 1,
    borderColor: '#e0e7ff', // indigo-100
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#f5f3ff', // indigo-50
    shadowColor: '#94a3b8', // slate-400
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  // Image container inside property card
  imageWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },

  // Image thumbnail styling
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1', // slate-300
  },

  // Default text styling
  text: {
    fontSize: 16,
    color: '#1e293b', // slate-700
    marginBottom: 6,
    fontFamily: 'NunitoRegular',
  },

  // Modal overlay (background dim effect)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Modal content box
  modalContent: {
    width: 320,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },

  // Container for modal action buttons
  modalActions: {
    flexDirection: 'row',
    marginTop: 20,
  },

  // Base modal button style
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },

  // Delete button style
  deleteButton: {
    backgroundColor: '#e33434ff', // red
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },

  // Delete button text
  deleteButtonText: {
    color: '#fcfcfcff', // near white text
    fontSize: 14,
    fontWeight: '600',
  },

  // Primary button styling
  button: {
    backgroundColor: '#799cc9ff', // soft blue
    borderWidth: 1,
    borderColor: '#799cc9ff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },

  // Primary button text
  buttonText: {
    color: '#fcfcfcff', // near white text
    fontSize: 16,
    fontWeight: '600',
  },

  // Error text styling
  errorText: {
    color: '#d9534f', // soft red
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '300',
  },
});

export default styles;