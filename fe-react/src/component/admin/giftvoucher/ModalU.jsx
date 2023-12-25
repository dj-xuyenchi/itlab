import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';

const YourComponent = () => {
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucherId, setSelectedVoucherId] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch vouchers and all users when the component mounts
    const fetchData = async () => {
      try {
        const voucherResponse = await axios.get('http://localhost:8089/api/voucher/voucher-combox');
        const usersResponse = await axios.get('http://localhost:8089/api/voucher/giftvoucher'); // replace with your actual endpoint

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

  const handleAddVoucher = async () => {
    try {
      if (!selectedVoucherId || selectedUserIds.length === 0) {
        console.error('Please select a voucher and at least one user.');
        return;
      }
  
      // Tạo một đối tượng chứa tham số để Axios tự xử lý việc chuyển đổi dữ liệu
      const data = {
        voucherId: selectedVoucherId,
        nguoiDungId: selectedUserIds.join(',')
      };
  
      // Sử dụng thư viện qs để xây dựng tham số URL một cách đúng đắn
      const url = 'http://localhost:8089/api/voucher/add-nguoidung?' + qs.stringify(data);
  
      // Make a POST request to add the selected voucher for selected users
      const response = await axios.post(url);
  
      console.log('Voucher added for selected users successfully.', response.data);
      // Optionally, you can reset the selected voucher and users after successful addition
      setSelectedVoucherId('');
      setSelectedUserIds([]);
    } catch (error) {
      console.error('Failed to add voucher for selected users:', error.response ? error.response.data : error.message);
    }
  };
  

  const handleSelectChange = (e) => {
    setSelectedVoucherId(e.target.value); // Update selected voucher ID when the selection changes
  };

  const handleUserCheckboxChange = (userId) => {
    // Toggle the selected state of a user
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
        <p>Loading data...</p>
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

          <div>
            <h2>Select Users:</h2>
            {allUsers.map((user) => (
              <div key={user.id}>
                <input
                  type="checkbox"
                  id={`user-${user.id}`}
                  checked={selectedUserIds.includes(user.id)}
                  onChange={() => handleUserCheckboxChange(user.id)}
                />
                <label htmlFor={`user-${user.id}`}>{user.maNguoiDung}</label>
              </div>
            ))}
          </div>

          <button onClick={handleAddVoucher}>Add Voucher for Selected Users</button>
        </>
      )}
    </div>
  );
};

export default YourComponent;
