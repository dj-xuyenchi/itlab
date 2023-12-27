import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import { Select, Checkbox, Button, Spin,notification } from 'antd';

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
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const voucherResponse = await axios.get('http://localhost:8089/api/voucher/voucher-combox');
        const usersResponse = await axios.get('http://localhost:8089/api/voucher/giftvoucher');

        setVouchers(voucherResponse.data);
        setAllUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Enable the button only if a voucher is selected and at least one user is checked
    setButtonDisabled(!selectedVoucherId || selectedUserIds.length === 0);
  }, [selectedVoucherId, selectedUserIds]);

  const handleAddVoucher = async () => {
    try {
      if (!selectedVoucherId || selectedUserIds.length === 0) {
        console.error('Please select a voucher and at least one user.');
        return;
      }

      const data = {
        voucherId: selectedVoucherId,
        nguoiDungId: selectedUserIds.join(',')
      };

      const url = 'http://localhost:8089/api/voucher/add-nguoidung?' + qs.stringify(data);

      const response = await axios.post(url);

      console.log('Voucher added for selected users successfully.', response.data);
      openNotification("success", "Hệ thống", "Tặng người dùng thành công", "bottomRight");

      // Optionally, you can reset the selected voucher and users after successful addition
      setSelectedVoucherId('');
      setSelectedUserIds([]);
    } catch (error) {
      console.error('Failed to add voucher for selected users:', error.response ? error.response.data : error.message);
    }
  };

  const handleSelectChange = (value) => {
    setSelectedVoucherId(value);
  };

  const handleUserCheckboxChange = (userId) => {
    setSelectedUserIds((prevSelectedUserIds) => {
      if (prevSelectedUserIds.includes(userId)) {
        return prevSelectedUserIds.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUserIds, userId];
      }
    });
  };

  return (
    <div>
      <h1>Vouchers</h1>
      {loading ? (
        <Spin tip="Loading data..." />
      ) : (
        <>
          <label>Select a Voucher:</label>
          <Select
            style={{ width: '200px' }}
            placeholder="Select a voucher"
            onChange={handleSelectChange}
            value={selectedVoucherId}
          >
            {vouchers.map((voucher) => (
              <Option key={voucher.id} value={voucher.id}>
                {voucher.tenVoucher}
              </Option>
            ))}
          </Select>

          <div>
            <h2>Select Users:</h2>
            {allUsers.map((user) => (
              <div key={user.id}>
                <Checkbox
                  id={`user-${user.id}`}
                  checked={selectedUserIds.includes(user.id)}
                  onChange={() => handleUserCheckboxChange(user.id)}
                >
                  {user.maNguoiDung}
                </Checkbox>
              </div>
            ))}
          </div>

          <Button type="primary" onClick={handleAddVoucher} disabled={buttonDisabled}>
            Tặng người dùng
          </Button>
        </>
      )}
    </div>
  );
};

export default YourComponent;
