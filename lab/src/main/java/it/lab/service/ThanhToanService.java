package it.lab.service;

import it.lab.common.ResponObject;
import it.lab.dto.DiaChiDTO;
import it.lab.dto.GioHangDTO;
import it.lab.dto.PhuongThucThanhToanDTO;
import it.lab.dto.PhuongThucVanChuyenDTO;
import it.lab.entity.NguoiDung;
import it.lab.enums.APIStatus;
import it.lab.iservice.IThanhToan;
import it.lab.modelcustom.respon.CheckOut;
import it.lab.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ThanhToanService implements IThanhToan {
    @Autowired
    private GioHangRepo _gioHangRepo;
    @Autowired
    private NguoiDungRepo _nguoiDungRepo;
    @Autowired
    private SanPhamChiTietRepo _sanPhamChiTietRepo;
    @Autowired
    private DiaChiRepo _diaChiRepo;
    @Autowired
    private PhuongThucThanhToanRepo _phuongThucThanhToanRepo;
    @Autowired
    private PhuongThucVanChuyenRepo _phuongThucVanChuyenRepo;

    @Override
    public ResponObject<CheckOut, APIStatus> layDuLieuThanhToan(Long nguoiDungId) {
        Optional<NguoiDung> ng = _nguoiDungRepo.findById(nguoiDungId);
        if (ng.isEmpty()) {
            return new ResponObject<>(null, APIStatus.THATBAI, "Người dùng không tồn tại!");
        }
        List<GioHangDTO> listGioHang = GioHangDTO.fromCollection(_gioHangRepo.findGioHangsByNguoiMua(ng.get()));
        List<DiaChiDTO> listDiaChi = DiaChiDTO.fromCollection(_diaChiRepo.findDiaChisByNguoiDung(ng.get()));
        List<PhuongThucThanhToanDTO> listPhuongThucThanhToan = PhuongThucThanhToanDTO.fromCollection(_phuongThucThanhToanRepo.findAll());
        List<PhuongThucVanChuyenDTO> listPhuongThucVanChuyen = PhuongThucVanChuyenDTO.fromCollection(_phuongThucVanChuyenRepo.findAll());
        return new ResponObject<CheckOut, APIStatus>(new CheckOut(listGioHang, listDiaChi, listPhuongThucThanhToan, listPhuongThucVanChuyen), APIStatus.THANHCONG, "Thành công!");
    }
}
