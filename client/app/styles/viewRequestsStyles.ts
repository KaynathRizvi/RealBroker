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
        backgroundColor: '#e8f1ff',
        borderLeftColor: '#7d92b4ff', // pastel blue border
        borderLeftWidth: 4,
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
        fontSize: 12,
        overflow: 'hidden',
        backgroundColor: '#b0cff4ff',
        color: '#1e3a8a',
    },
    acceptedStatus: {
        backgroundColor: '#bbf7d0', // pastel green
        color: '#166534',
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 12,
        justifyContent: 'space-between',
        width: 180,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    acceptButton: {
        backgroundColor: '#bbf7d0', // pastel green
    },
    rejectButton: {
        backgroundColor: '#fecaca', // pastel red/pink
    },
    buttonText: {
        color: '#166534', // green text for accept
        fontWeight: 'bold',
        textAlign: 'center',
    },
    rejectButtonText: {
        color: '#7f1d1d', // red text for reject
    },
    detailsContainer: {
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
});
