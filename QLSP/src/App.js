import './App.scss';
import TableSP from './components/view/TableMauSac';
import Container from 'react-bootstrap/Container';
import {Row} from 'react-bootstrap';
import ModalAddNew from './components/add/ModalAddMauSac';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
function App() {

  const [isShowMoDalAddNew,setIsShowMoDalAddNew] = useState(false)
  const handleClose = () =>{
    setIsShowMoDalAddNew(false)
  }

  return (
    <>
    <div className='app-container'>
        <Container>
          <div className='my-3 add-new'>
            <span><b>Danh sách màu sắc</b></span>
            <button className='btn btn-success' onClick={() => setIsShowMoDalAddNew(true) }>Add màu sắc</button>
          </div>
          <TableSP />
        </Container>

        <ModalAddNew
        show={isShowMoDalAddNew}
        handleClose={handleClose}
        
        /> 
    </div>

    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
/>
    </>
  );
}

export default App;
