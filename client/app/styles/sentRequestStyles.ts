import { StyleSheet } from 'react-native';

const requestListStyles = StyleSheet.create({
    // Background gradient container
    gradient: {
        flex: 1,
        paddingTop: 20, // space from top
    },

    // Loading spinner position
    loading: {
        marginTop: 50,
    },

    // "No requests" placeholder text
    noRequests: {
        padding: 20,
        textAlign: 'center',
        fontSize: 16,
        color: '#6b7280', // neutral gray
    },

    // Main request card style
    card: {
        backgroundColor: '#fff2e5',   // light pastel peach
        borderLeftColor: "#e3b383ff", // warm beige accent
        borderLeftWidth: 4,           // accent bar on left
        padding: 15,
        borderRadius: 12,
        marginHorizontal: 12,
        marginVertical: 8,
        shadowColor: '#000',          // subtle shadow
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,                  // Android shadow
    },

    // Row for card header (property + status)
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    // Property name text
    property: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#374151', // slate gray
    },

    // Status badge base style
    status: {
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        overflow: 'hidden',
        fontSize: 12,
    },

    // Status variations
    accepted: {
        backgroundColor: '#bbf7d0', // pastel green
        color: '#166534',           // deep green text
    },
    rejected: {
        backgroundColor: '#fecaca', // pastel red/pink
        color: '#7f1d1d',           // deep red text
    },
    pending: {
        backgroundColor: '#b0cff4ff', // pastel blue
        color: '#1e3a8a',             // deep blue text
    },

    // Details section inside the card
    details: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 8,
    },

    // Text inside details
    detailText: {
        fontSize: 14,
        color: '#374151', // slate gray
        marginBottom: 4,
    },

    // Waiting message style
    waitingText: {
        fontSize: 14,
        color: '#6b7280',  // neutral gray
        fontStyle: 'italic',
    },
});

export default requestListStyles;