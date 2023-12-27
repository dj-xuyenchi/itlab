import React, { useState, useEffect } from 'react';
import { Select, Button, Spin,notification } from 'antd';
import axios from 'axios';

const { Option } = Select;

const openNotification = (type, message, description, placement) => {
  notification[type]({
    message,
    description,
    placement,
  });
};

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
      openNotification("success", "Hệ thống", "Thêm Thành công", "bottomRight");

      // Optionally, you can reset the selected voucher after successful addition
      setSelectedVoucherId('');
    } catch (error) {
      console.error('Failed to add voucher for all users:', error);
    }
  };

  const handleSelectChange = (value) => {
    setSelectedVoucherId(value); // Update selected voucher ID when the selection changes
  };

  return (
    <div>
      <h1>Vouchers</h1>
      {loading ? (
        <Spin tip="Loading vouchers..." />
      ) : (
        <>
          <label>Select a Voucher:</label>
          <Select style={{ width: 200 }} onChange={handleSelectChange} value={selectedVoucherId}>
            <Option value="">Select a voucher</Option>
            {vouchers.map((voucher) => (
              <Option key={voucher.id} value={voucher.id}>
                {voucher.tenVoucher}
              </Option>
            ))}
          </Select>
          <br />
          <Button type="primary" onClick={handleAddVoucher} disabled={!selectedVoucherId}>
            Tặng tất cả 
          </Button>
        </>
      )}
    </div>
  );
};

export default YourComponent;
