import {Modal, Button} from 'react-bootstrap';
import { deleteChatLieuSac, getAllChatLieuSac } from '../../service/ChatLieuSacService';
import { toast } from 'react-toastify';

const ModalDeleteCL = (props) =>{
    const {show, handleClose,dataChatLieuSacDelete,handleDeleteSuccess} = props;

    const confirmDelete = async(id) => { 
      let res = await deleteChatLieuSac(id)
      if(res){
        handleDeleteSuccess();
        handleClose();
        toast.success("Delete success")

      }
    } 

    return(
        <>
         <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
        <Modal.Header closeButton>
          <Modal.Title>Delete Màu sắc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='body-add-new'>
                Bạn chắc chắn muốn xóa ?
                <br/>
               <b> Mã màu: {dataChatLieuSacDelete.maChatLieu} </b>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDelete(dataChatLieuSacDelete.id)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
        
        </>
    )
}
export default ModalDeleteCL;