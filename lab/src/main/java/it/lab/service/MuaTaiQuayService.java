package it.lab.service;

import it.lab.dto.HoaDonChiTietDTO;
import it.lab.dto.SanPhamChiTietDTO;
import it.lab.entity.HoaDon;
import it.lab.entity.HoaDonChiTiet;
import it.lab.entity.SanPhamChiTiet;
import it.lab.enums.TrangThaiHoaDon;
import it.lab.iservice.IMuaTaiQuayService;
import it.lab.modelcustom.respon.HoaDonChoTaiCuaHang;
import it.lab.repository.HoaDonChiTietRepo;
import it.lab.repository.HoaDonRepo;
import it.lab.repository.NguoiDungRepo;
import it.lab.repository.SanPhamChiTietRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MuaTaiQuayService implements IMuaTaiQuayService {
    @Autowired
    private HoaDonRepo _hoaDonRepo;
    @Autowired
    private NguoiDungRepo _nguoiDungRepo;
    @Autowired
    private SanPhamChiTietRepo _sanPhamChiTietRepo;
    @Autowired
    private HoaDonChiTietRepo _hoaDonChiTietRepo;

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

    @Override
    public List<SanPhamChiTietDTO> layHetChiTiet() {
        return SanPhamChiTietDTO.fromCollection(_sanPhamChiTietRepo.findAll());
    }

    @Override
    public List<HoaDonChiTietDTO> gioHangCuaHoaDon(Long hoaDonId) {
        HoaDon hoaDon = _hoaDonRepo.findById(hoaDonId).get();
        return HoaDonChiTietDTO.fromCollection(_hoaDonChiTietRepo.findHoaDonChiTietsByHoaDon(hoaDon));
    }

    @Override
    public List<HoaDonChiTietDTO> themSanPhamVaoHoaDon(Long hoaDonId, Long sanPhamId) {
        HoaDon hoaDon = _hoaDonRepo.findById(hoaDonId).get();
        SanPhamChiTiet sanPhamChiTiet = _sanPhamChiTietRepo.findById(sanPhamId).get();
        HoaDonChiTiet hoaDonNew = new HoaDonChiTiet();
        hoaDonNew.setHoaDon(hoaDon);
        hoaDonNew.setSoLuong(1);
        hoaDonNew.setSanPhamChiTiet(sanPhamChiTiet);
        hoaDonNew.setNgayTao(LocalDate.now());
        hoaDonNew.setDonGia(sanPhamChiTiet.getGiaBan());
        Double giaTri = 1 * sanPhamChiTiet.getGiaBan();
        hoaDon.setGiaTriHd(giaTri + hoaDon.getGiaTriHd());
        _hoaDonChiTietRepo.save(hoaDonNew);
        _hoaDonRepo.save(hoaDon);
        return gioHangCuaHoaDon(hoaDonId);
    }
}
