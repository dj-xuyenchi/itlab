import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YourComponent = () => {
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucherId, setSelectedVoucherId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch vouchers when the component mounts
    const fetchVouchers = async () => {
      try {
        const response = await axios.get('http://localhost:8089/api/voucher/voucher-combox');
        setVouchers(response.data);
      } catch (error) {
        console.error('Error fetching vouchers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  const handleAddVoucher = async () => {
    try {
      if (!selectedVoucherId) {
        console.error('Please select a voucher.');
        return;
      }

      // Make a POST request to add the selected voucher for all users
      await axios.post(`http://localhost:8089/api/voucher/addVoucherForAllUsers?voucherId=${selectedVoucherId}`);

      console.log('Voucher added for all users successfully.');
      // Optionally, you can reset the selected voucher after successful addition
      setSelectedVoucherId('');
    } catch (error) {
      console.error('Failed to add voucher for all users:', error);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedVoucherId(e.target.value); // Update selected voucher ID when the selection changes
  };

  return (
    <div>
      <h1>Vouchers</h1>
      {loading ? (
        <p>Loading vouchers...</p>
      ) : (
        <>
          <label>Select a Voucher:</label>
          <select onChange={handleSelectChange} value={selectedVoucherId}>
            <option value="">Select a voucher</option>
            {vouchers.map((voucher) => (
              <option key={voucher.id} value={voucher.id}>
                {voucher.tenVoucher}
              </option>
            ))}
          </select>
          <button onClick={handleAddVoucher}>Add Voucher for All Users</button>
        </>
      )}
    </div>
  );
};

export default YourComponent;
