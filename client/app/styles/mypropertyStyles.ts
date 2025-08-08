import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  list: {
    marginBottom: 25,
  },
  propertyCard: {
    borderWidth: 1,
    borderColor: '#e0e7ff', // indigo-100
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#f5f3ff', // indigo-50
    shadowColor: '#94a3b8',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  imageWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1', // slate-300
  },
  text: {
    fontSize: 16,
    color: '#1e293b', // slate-700
    marginBottom: 6,
    fontFamily: 'NunitoRegular',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 320,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButton:{
    backgroundColor: '#e33434ff',
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
  deleteButtonText:{
    color: '#fcfcfcff', // deep pastel lavender text
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#799cc9ff',
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
  buttonText: {
    color: '#fcfcfcff', // deep pastel lavender text
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
  color: '#d9534f', // soft red for errors
  fontSize: 14,
  marginBottom: 10,
  fontWeight: '500',
},
});

export default styles;
