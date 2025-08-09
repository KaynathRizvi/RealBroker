import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../config';
import '../styles/PropertyDetail.css';

// Component to display detailed information about a single property
const PropertyDetail = () => {
  // Get URL search params to extract property id
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  // State to store fetched property details
  const [property, setProperty] = useState<any>(null);

  // React Router navigation hook
  const navigate = useNavigate();

  // Fetch property details on component mount or when id changes
  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return; // Exit if no id provided

      try {
        // Get JWT token from localStorage for authorization
        const token = localStorage.getItem('token');

        // Fetch property details from admin API endpoint
        const res = await fetch(`${SERVER_URL}/api/admin/property/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer token auth header
          },
        });

        // Parse response JSON
        const data = await res.json();

        // Update state with fetched property data
        setProperty(data);
      } catch (err) {
        // Log errors if fetch fails
        console.error('❌ Failed to fetch property:', err);
      }
    };

    fetchProperty();
  }, [id]);

  // Show loading message while property data is not yet fetched
  if (!property) return <p>Loading...</p>;

  return (
    <div className="property-container">
      {/* Top bar with back button and title */}
      <div className="property-detail-topbar">
        {/* Navigate back to property list on click */}
        <button onClick={() => navigate('/properties')} className="detail-back-button">← Back</button>
        <h2>Property Details</h2>
      </div>

      {/* Display property name */}
      <h2 className="property-title">{property.property_name}</h2>

      {/* Display deal price or fallback text */}
      <p className="property-detail"><strong>Price:</strong> ₹{property.deal_price ?? 'Not specified'}</p>

      {/* Display property description or fallback */}
      <p className="property-description"><strong>Description:</strong> {property.property_desc ?? 'No description available.'}</p>

      {/* Scrollable container for property images */}
      <div className="image-scroll">
        {/* Map through array of image URLs and render thumbnails */}
        {property.property_pic_url?.map((url: string, index: number) => (
          <img key={index} src={url} alt="Property" className="thumbnail-image" />
        ))}
      </div>
    </div>
  );
};

export default PropertyDetail;