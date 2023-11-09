package it.lab.service;

import it.lab.common.Page;
import it.lab.common.ResponObject;
import it.lab.dto.HoaDonDTO;
import it.lab.dto.SanPhamChiTietDTO;
import it.lab.dto.SanPhamDTO;
import it.lab.entity.HoaDon;
import it.lab.entity.HoaDonChiTiet;
import it.lab.entity.SanPham;
import it.lab.entity.SanPhamChiTiet;
import it.lab.enums.APIStatus;
import it.lab.enums.TrangThaiHoaDon;
import it.lab.enums.XacNhanHoaDonEnum;
import it.lab.iservice.IHoaDonService;
import it.lab.modelcustom.respon.*;
import it.lab.repository.HoaDonChiTietRepo;
import it.lab.repository.HoaDonRepo;
import it.lab.repository.SanPhamChiTietRepo;
import it.lab.repository.SanPhamRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class HoaDonService implements IHoaDonService {
    @Autowired
    private HoaDonRepo _hoaDonRepo;
    @Autowired
    private HoaDonChiTietRepo _hoaDonChiTietRepo;
    @Autowired
    private SanPhamChiTietRepo _sanPhamChiTietRepo;

    @Override
    public Page<HoaDonCho> layHetHoaDonCho() {
        return new Page<HoaDonCho>(HoaDonCho.fromCollection(_hoaDonRepo.findAll()), 0, 100000);
    }

    @Override
    public Page<HoaDonChoGiao> layHetHoaDonChoGiao() {
        return new Page<HoaDonChoGiao>(HoaDonChoGiao.fromCollection(_hoaDonRepo.findAll()), 0, 100000);
    }

    @Override
    public Page<HoaDonHuy> layHetHoaDonHuy() {
        return new Page<HoaDonHuy>(HoaDonHuy.fromCollection(_hoaDonRepo.findAll()), 0, 100000);
    }

    @Override
    public Page<HoaDonDangGiao> layHetHoaDonDangGiao() {
        return new Page<HoaDonDangGiao>(HoaDonDangGiao.fromCollection(_hoaDonRepo.findAll()), 0, 100000);
    }

    @Override
    public Page<HoaDonHoanThanh> layHetHoaDonHoanThanh() {
        return new Page<HoaDonHoanThanh>(HoaDonHoanThanh.fromCollection(_hoaDonRepo.findAll()), 0, 100000);
    }

    @Override
    public ResponObject<List<String>, XacNhanHoaDonEnum> xacNhanHoaDon(Long[] hoaDonId) {
        List<String> hoaDonMaSanPhamDaHet = new ArrayList<>();
        boolean check = true;
        for (Long i : hoaDonId) {
            check = true;
            Optional<HoaDon> hd = _hoaDonRepo.findById(i);
            if (hd.isEmpty()) {
                continue;
            }
            List<HoaDonChiTiet> chiTiet = _hoaDonChiTietRepo.findHoaDonChiTietsByHoaDon(hd.get());
            for (HoaDonChiTiet hdChiTiet : chiTiet) {
                Optional<SanPhamChiTiet> sp = _sanPhamChiTietRepo.findById(hdChiTiet.getSanPhamChiTiet().getId());
                if (sp.get().getSoLuongTon() < hdChiTiet.getSoLuong()) {
                    check = false;
                    hoaDonMaSanPhamDaHet.add(" " + hd.get().getMaHoaDon() + " của khách hàng " + hd.get().getNguoiMua().getHo() + " " + hd.get().getNguoiMua().getTen() + " ");
                    break;
                }
                sp.get().setSoLuongTon(sp.get().getSoLuongTon() - hdChiTiet.getSoLuong());
                _sanPhamChiTietRepo.save(sp.get());
            }
            if (check) {
                hd.get().setTrangThai(TrangThaiHoaDon.CHOGIAOHANG);
                _hoaDonRepo.save(hd.get());
            }
        }
        return new ResponObject<List<String>, XacNhanHoaDonEnum>(hoaDonMaSanPhamDaHet, XacNhanHoaDonEnum.THANHCONG, "Thành công");
    }

    @Override
    public ResponObject<List<String>, XacNhanHoaDonEnum> chuyenSangDangGiao(Long[] hoaDonId) {
        List<String> hoaDonMaSanPhamDaHet = new ArrayList<>();
        boolean check = true;
        for (Long i : hoaDonId) {
//            check = true;
            Optional<HoaDon> hd = _hoaDonRepo.findById(i);
//            if (hd.isEmpty()) {
//                continue;
//            }
//            List<HoaDonChiTiet> chiTiet = _hoaDonChiTietRepo.findHoaDonChiTietsByHoaDon(hd.get());
//            for (HoaDonChiTiet hdChiTiet : chiTiet) {
//                Optional<SanPhamChiTiet> sp = _sanPhamChiTietRepo.findById(hdChiTiet.getSanPhamChiTiet().getId());
//                if (sp.get().getSoLuongTon() < hdChiTiet.getSoLuong()) {
//                    check = false;
//                    hoaDonMaSanPhamDaHet.add(" " + hd.get().getMaHoaDon() + " của khách hàng " + hd.get().getNguoiMua().getHo() + " " + hd.get().getNguoiMua().getTen() + " ");
//                    break;
//                }
//                sp.get().setSoLuongTon(sp.get().getSoLuongTon() - hdChiTiet.getSoLuong());
//                _sanPhamChiTietRepo.save(sp.get());
//            }
//            if (check) {
            hd.get().setTrangThai(TrangThaiHoaDon.DANGGIAO);
            _hoaDonRepo.save(hd.get());
            //   }
        }
        return new ResponObject<List<String>, XacNhanHoaDonEnum>(hoaDonMaSanPhamDaHet, XacNhanHoaDonEnum.THANHCONG, "Thành công");
    }

    @Override
    public ResponObject<List<String>, XacNhanHoaDonEnum> chuyenSangHoanThanh(Long[] hoaDonId) {
        List<String> hoaDonMaSanPhamDaHet = new ArrayList<>();
        boolean check = true;
        for (Long i : hoaDonId) {
//            check = true;
            Optional<HoaDon> hd = _hoaDonRepo.findById(i);
//            if (hd.isEmpty()) {
//                continue;
//            }
//            List<HoaDonChiTiet> chiTiet = _hoaDonChiTietRepo.findHoaDonChiTietsByHoaDon(hd.get());
//            for (HoaDonChiTiet hdChiTiet : chiTiet) {
//                Optional<SanPhamChiTiet> sp = _sanPhamChiTietRepo.findById(hdChiTiet.getSanPhamChiTiet().getId());
//                if (sp.get().getSoLuongTon() < hdChiTiet.getSoLuong()) {
//                    check = false;
//                    hoaDonMaSanPhamDaHet.add(" " + hd.get().getMaHoaDon() + " của khách hàng " + hd.get().getNguoiMua().getHo() + " " + hd.get().getNguoiMua().getTen() + " ");
//                    break;
//                }
//                sp.get().setSoLuongTon(sp.get().getSoLuongTon() - hdChiTiet.getSoLuong());
//                _sanPhamChiTietRepo.save(sp.get());
//            }
//            if (check) {
            hd.get().setTrangThai(TrangThaiHoaDon.DAGIAO);
            _hoaDonRepo.save(hd.get());
            //   }
        }
        return new ResponObject<List<String>, XacNhanHoaDonEnum>(hoaDonMaSanPhamDaHet, XacNhanHoaDonEnum.THANHCONG, "Thành công");

    }

    @Override
    public ResponObject<List<String>, XacNhanHoaDonEnum> huyHoaDon(Long[] hoaDonId) {
        for (Long hdId : hoaDonId) {
            Optional<HoaDon> hd = _hoaDonRepo.findById(hdId);
            if (hd.isEmpty()) {
                continue;
            }
            hd.get().setTrangThai(TrangThaiHoaDon.CUAHANGHUY);
            _hoaDonRepo.save(hd.get());
        }
        return new ResponObject<List<String>, XacNhanHoaDonEnum>(null, XacNhanHoaDonEnum.THANHCONG, "Thành công");
    }

    @Override
    public ResponObject<HoaDonDTO, APIStatus> layHoaDonById(Long hoaDonId) {
        Optional<HoaDon> hd = _hoaDonRepo.findById(hoaDonId);
        if (hd.isEmpty()) {
            return new ResponObject<>(null, APIStatus.THATBAI, "Thất bại");
        }
        return new ResponObject<>(HoaDonDTO.fromEntity(hd.get()), APIStatus.THATBAI, "Thất bại");
    }
}
