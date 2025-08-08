import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    gradient: {
        flex: 1,
        paddingTop: 20,
    },
    loading: {
        marginTop: 50,
    },
    noRequests: {
        padding: 20,
        textAlign: 'center',
        fontSize: 16,
        color: '#6b7280',
    },
    card: {
        backgroundColor: '#fff2e5',
        borderLeftColor: "#e3b383ff",
        borderLeftWidth: 4, // pastel lavender
        padding: 15,
        borderRadius: 12,
        marginHorizontal: 12,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    property: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#374151',
    },
    status: {
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        overflow: 'hidden',
        fontSize: 12,
    },
    accepted: {
        backgroundColor: '#bbf7d0', // pastel green
        color: '#166534',
    },
    rejected: {
        backgroundColor: '#fecaca', // pastel red/pink
        color: '#7f1d1d',
    },
    pending: {
        backgroundColor: '#b0cff4ff', // pastel blue
        color: '#1e3a8a',
    },
    details: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 8,
    },
    detailText: {
        fontSize: 14,
        color: '#374151',
        marginBottom: 4,
    },
    waitingText: {
        fontSize: 14,
        color: '#6b7280',
        fontStyle: 'italic',
    },
});
