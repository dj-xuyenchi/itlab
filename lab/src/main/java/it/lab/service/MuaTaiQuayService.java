package it.lab.service;

import it.lab.entity.HoaDon;
import it.lab.enums.TrangThaiHoaDon;
import it.lab.iservice.IMuaTaiQuayService;
import it.lab.modelcustom.respon.HoaDonChoTaiCuaHang;
import it.lab.repository.HoaDonRepo;
import it.lab.repository.NguoiDungRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MuaTaiQuayService implements IMuaTaiQuayService {
    @Autowired
    private HoaDonRepo _hoaDonRepo;
    @Autowired
    private NguoiDungRepo _nguoiDungRepo;

    @Override
    public List<HoaDonChoTaiCuaHang> layDanhSachTaiCuaHang() {
        return HoaDonChoTaiCuaHang.fromCollection(_hoaDonRepo.findAll());
    }

    @Override
    public String taoMoiHoaDon(Long nhanVienId) {
        HoaDon hoaDon = new HoaDon();
        hoaDon.setNgayTao(LocalDateTime.now());
        hoaDon.setNhanVien(_nguoiDungRepo.findById(nhanVienId).get());
        hoaDon.setGiaTriHd(0d);
        hoaDon.setPhiGiaoHang(0d);
        hoaDon.setTrangThai(TrangThaiHoaDon.HOADONCHO);
        _hoaDonRepo.save(hoaDon);
        hoaDon.setMaHoaDon("HD" + hoaDon.getId());
        _hoaDonRepo.save(hoaDon);
        return hoaDon.getMaHoaDon();
    }
}
