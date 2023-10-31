package it.lab.iservice;

import it.lab.common.ResponObject;
import it.lab.dto.NguoiDungDTO;
import it.lab.enums.CapNhat;

public interface INguoiDungService {
    public NguoiDungDTO layThongTinTaiKhoanById(Long id);
    public ResponObject<NguoiDungDTO, CapNhat> capNhatNguoiDung(NguoiDungDTO nguoiDung);
}
