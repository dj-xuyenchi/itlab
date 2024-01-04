package it.lab.iservice;

import it.lab.common.Page;
import it.lab.common.ResponObject;
import it.lab.dto.ChatLieuDTO;
import it.lab.dto.DiaChiDTO;
import it.lab.dto.NguoiDungDTO;
import it.lab.entity.ChatLieu;
import it.lab.entity.DiaChi;
import it.lab.entity.NguoiDung;
import it.lab.enums.APIStatus;
import it.lab.enums.CapNhat;
import it.lab.modelcustom.request.DiaChiRequest;
import it.lab.modelcustom.request.DoiMatKhau;
import it.lab.modelcustom.request.NguoiDungRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface INguoiDungService {
    public Page<NguoiDungDTO> layHetNguoiDung();

    public NguoiDungDTO layThongTinTaiKhoanById(Long id);

    public ResponObject<String, APIStatus> capNhatNguoiDung(NguoiDungRequest nguoiDungRequest, MultipartFile anhdaidien) throws IOException;

    public ResponObject<NguoiDungDTO, CapNhat> doiMatKhau(DoiMatKhau matKhau);

    public Page<NguoiDungDTO> xoaNguoiDung(Long nguoiDungId);

    public List<DiaChiDTO> layDiaChiNguoiDung(Long nguoiDungId);

    ResponObject<String, APIStatus> capNhatDiaChiMacDinh(Long nguoiDungId, Long diaChiId);

    ResponObject<String, APIStatus> themDiaChi(DiaChiRequest diaChiRequest);

    ResponObject<String, APIStatus> capNhatDiaChi(DiaChiRequest diaChiRequest);

    public ResponObject<String, APIStatus> themNguoiDung(NguoiDungRequest nguoiDung, MultipartFile anhdaidien) throws IOException;
}
