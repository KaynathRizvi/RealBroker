import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../config';
import '../styles/PropertyDetail.css';

const PropertyDetail = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [property, setProperty] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;

      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${SERVER_URL}/api/admin/property/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setProperty(data);
    } catch (err) {
      console.error('❌ Failed to fetch property:', err);
    }
    };

    fetchProperty();
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <div className="property-container">
        <div className="property-detail-topbar">
            <button onClick={() => navigate('/properties')} className="detail-back-button">← Back</button>
            <h2>Property Details</h2>
        </div>
      <h2 className="property-title">{property.property_name}</h2>
      <p className="property-detail"><strong>Price:</strong> ₹{property.deal_price ?? 'Not specified'}</p>
      <p className="property-description"><strong>Description:</strong> {property.property_desc ?? 'No description available.'}</p>

      <div className="image-scroll">
        {property.property_pic_url?.map((url: string, index: number) => (
          <img key={index} src={url} alt="Property" className="thumbnail-image" />
        ))}
      </div>
    </div>
  );
};

export default PropertyDetail;
