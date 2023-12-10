package it.lab.iservice;

import it.lab.common.Page;
import it.lab.common.ResponObject;
import it.lab.dto.NguoiDungDTO;
import it.lab.entity.NguoiDung;
import it.lab.enums.CapNhat;
import it.lab.modelcustom.request.DoiMatKhau;

public interface INguoiDungService {
    public Page<NguoiDungDTO> layHetNguoiDung();
    public NguoiDungDTO layThongTinTaiKhoanById(Long id);
    public ResponObject<NguoiDungDTO, CapNhat> capNhatNguoiDung(NguoiDungDTO nguoiDung);
    public ResponObject<NguoiDungDTO, CapNhat> doiMatKhau(DoiMatKhau matKhau);
    public Page<NguoiDungDTO> xoaNguoiDung(Long nguoiDungId);
    public Page<NguoiDungDTO> themNguoiDung(NguoiDung nguoiDung);
}
