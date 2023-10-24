package it.lab.service;

import it.lab.common.Page;
import it.lab.common.ResponObject;
import it.lab.dto.SanPhamChiTietDTO;
import it.lab.dto.SanPhamDTO;
import it.lab.entity.MauSac;
import it.lab.entity.SanPham;
import it.lab.iservice.ISanPhamService;
import it.lab.modelcustom.respon.SanPhamChiTiet;
import it.lab.repository.SanPhamChiTietRepo;
import it.lab.repository.SanPhamRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class SanPhamService implements ISanPhamService {
    @Autowired
    private SanPhamRepo _sanPhamRepository;
    @Autowired
    private SanPhamChiTietRepo _sanPhamChiTietRepository;

    @Override
    public Page<SanPhamDTO> phanTrangSanPhamTrangChu(Integer page,
                                                     Integer pageSize,
                                                     Long chatLieuId,
                                                     Long thietKeId,
                                                     Long thuongHieuId,
                                                     Long mauSacId,
                                                     Long loaiSanPhamId,
                                                     Long kichThuocId) {
        List<SanPham> list = _sanPhamRepository.findAll();
        if (list.size() > 0) {
            list.sort(Comparator.comparing(SanPham::getNgayTao));
        }
        if (thietKeId != null) {
            list = list.stream().filter(x -> x.getThietKe().getId() == thietKeId).toList();
        }
        if (chatLieuId != null) {
            list = list.stream().filter(x -> x.getChatLieu().getId() == chatLieuId).toList();
        }
        if (loaiSanPhamId != null) {
            list = list.stream().filter(x -> x.getNhomSanPham().getId() == loaiSanPhamId).toList();
        }
        if (thuongHieuId != null) {
            list = list.stream().filter(x -> x.getBrand().getId() == thuongHieuId).toList();
        }
        if (mauSacId != null) {
            list = list.stream().filter(x -> x.getSanPhamChiTietList().stream().anyMatch(y -> y.getMauSac().getId() == mauSacId)).toList();
        }
        if (kichThuocId != null) {
            list = list.stream().filter(x -> x.getSanPhamChiTietList().stream().anyMatch(y -> y.getKichThuoc().getId() == kichThuocId)).toList();
        }
        return new Page<SanPhamDTO>(SanPhamDTO.fromCollection(list), page, pageSize);
    }

    @Override
    public SanPhamChiTiet chiTietSanPham(Long sanPhamId) {
        Optional<SanPham> sp = _sanPhamRepository.findById(sanPhamId);
        if (sp.isEmpty()) {
            return null;
        }
        return new SanPhamChiTiet(SanPhamDTO.fromEntity(sp.get()), SanPhamChiTietDTO.fromCollection(_sanPhamChiTietRepository.findSanPhamChiTietsBySanPham(sp.get())));
    }
}
