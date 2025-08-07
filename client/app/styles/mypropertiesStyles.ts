import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#334155', // slate-800
    marginBottom: 20,
    fontFamily: 'NunitoBold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#64748b', // slate-500
    marginBottom: 12,
    fontFamily: 'NunitoSemiBold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0', // slate-200
    backgroundColor: '#ffffff',
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    fontSize: 16,
    color: '#0f172a', // slate-900
    fontFamily: 'NunitoRegular',
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
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default styles;
