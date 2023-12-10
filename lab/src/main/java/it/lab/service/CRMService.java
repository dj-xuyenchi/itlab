package it.lab.service;

import it.lab.dto.SanPhamYeuThichDTO;
import it.lab.entity.NguoiDung;
import it.lab.entity.SanPhamYeuThich;
import it.lab.entity.SuKienGiamGia;
import it.lab.enums.APIStatus;
import it.lab.enums.TrangThaiHoaDon;
import it.lab.enums.TrangThaiSuKienGiamGia;
import it.lab.iservice.ICRMService;
import it.lab.modelcustom.respon.DoanhThu;
import it.lab.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class CRMService implements ICRMService {
    @Autowired
    private NguoiDungRepo _nguoidungRepo;
    @Autowired
    private SanPhamYeuThichRepo _sanPhamYeuThichRepo;
    @Autowired
    private HoaDonRepo _hoaDonRepo;
    @Autowired
    private HoaDonChiTietRepo _hoaDonChiTiet;
    @Autowired
    private SuKienGiamGiaRepo _suKienGiamGiaRepo;

    @Override
    public List<SanPhamYeuThichDTO> getSanPhamYeuThichUser(Long userId) {
        Optional<NguoiDung> ng = _nguoidungRepo.findById(userId);
        if (ng.isEmpty()) {
            return null;
        }
        return SanPhamYeuThichDTO.fromCollection(_sanPhamYeuThichRepo.findAllByNguoiDungEquals(ng.get()));
    }

    @Override
    public List<DoanhThu> doanhThuTheo12Thang() {
        List<DoanhThu> res = new ArrayList<>();
        Long namHienTai = (long) LocalDate.now().getYear();
        var hoaDonList = _hoaDonRepo.findAll().stream().filter(x -> x.getNgayTao().getYear() == namHienTai && (x.getTrangThai() == TrangThaiHoaDon.DAGIAO || x.getTrangThai() == TrangThaiHoaDon.DADOITRA)).toList();
        for (int i = 1; i < 13; i++) {
            int thang = i;
            double total = 0d;
            double von = 0d;
            var hoaDonTrongThang = hoaDonList.stream().filter(x -> x.getNgayTao().getMonthValue() == thang).toList();
            for (var hoaDon : hoaDonTrongThang) {
                var chiTiet = _hoaDonChiTiet.findHoaDonChiTietsByHoaDon(hoaDon);
                for (var chiTietItem : chiTiet) {
                    von += chiTietItem.getSanPhamChiTiet().getGiaNhap() * chiTietItem.getSoLuong();
                    total += chiTietItem.getDonGia() * chiTietItem.getSoLuong();
                }
            }
            res.add(new DoanhThu(thang, von, total));
        }
        return res;
    }

    @Override
    public APIStatus themSuKien(SuKienGiamGia suKienGiamGia) {
        suKienGiamGia.setNgayTao(LocalDateTime.now());
        if (suKienGiamGia.getNgayBatDau().isBefore(LocalDateTime.now())) {
            suKienGiamGia.setTrangThai(TrangThaiSuKienGiamGia.HOATDONG);
        } else {
            suKienGiamGia.setTrangThai(TrangThaiSuKienGiamGia.DANGUNG);
        }
        _suKienGiamGiaRepo.save(suKienGiamGia);
        return APIStatus.THANHCONG;
    }
}
