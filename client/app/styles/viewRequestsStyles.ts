import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    // Container with gradient background and padding at the top
    gradient: {
        flex: 1,
        paddingTop: 20,
    },

    // Loading spinner container spacing from top
    loading: {
        marginTop: 50,
    },

    // Text shown when there are no requests
    noRequests: {
        padding: 20,
        textAlign: 'center',
        fontSize: 16,
        color: '#6b7280', // neutral gray
    },

    // Card container for each request
    card: {
        backgroundColor: '#e8f1ff',          // soft pastel blue background
        borderLeftColor: '#7d92b4ff',        // pastel blue left border accent
        borderLeftWidth: 4,                   // width of accent border
        padding: 15,
        borderRadius: 12,
        marginHorizontal: 12,
        marginVertical: 8,
        shadowColor: '#000',                  // subtle shadow for elevation
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,                        // Android shadow
    },

    // Row container for card header: property name and status badge
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',     // space between property and status
        alignItems: 'center',
    },

    // Property text styling in the header
    property: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#374151',                    // dark slate gray
    },

    // Base style for status badge
    status: {
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        fontSize: 12,
        overflow: 'hidden',
        backgroundColor: '#b0cff4ff',       // pastel blue background
        color: '#1e3a8a',                   // dark blue text
    },

    // Variation of status badge for accepted requests
    acceptedStatus: {
        backgroundColor: '#bbf7d0',          // pastel green background
        color: '#166534',                    // deep green text
    },

    // Container for accept/reject buttons, laid out horizontally
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 12,
        justifyContent: 'space-between',
        width: 180,                         // fixed width for consistent button layout
    },

    // Base style for both buttons
    button: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 6,
    },

    // Accept button specific styling (green background)
    acceptButton: {
        backgroundColor: '#bbf7d0',
    },

    // Reject button specific styling (red/pink background)
    rejectButton: {
        backgroundColor: '#fecaca',
    },

    // Text style for accept button text
    buttonText: {
        color: '#166534',                   // green text color
        fontWeight: 'bold',
        textAlign: 'center',
    },

    // Text style for reject button text
    rejectButtonText: {
        color: '#7f1d1d',                   // deep red text color
    },

    // Container for detailed information below the buttons
    detailsContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#ffffff',         // white background for details
        borderRadius: 8,
    },

    // Text style for details inside the details container
    detailText: {
        fontSize: 14,
        color: '#374151',                   // dark slate gray text
        marginBottom: 4,
    },
});