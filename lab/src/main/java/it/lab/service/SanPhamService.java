package it.lab.service;

import it.lab.common.Page;
import it.lab.common.ResponObject;
import it.lab.dto.SanPhamChiTietDTO;
import it.lab.dto.SanPhamDTO;
import it.lab.entity.MauSac;
import it.lab.entity.SanPham;
import it.lab.enums.APIStatus;
import it.lab.iservice.ISanPhamService;
import it.lab.modelcustom.respon.FullThuocTinh;
import it.lab.modelcustom.respon.SanPhamChiTiet;
import it.lab.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SanPhamService implements ISanPhamService {
    @Autowired
    private SanPhamRepo _sanPhamRepository;
    @Autowired
    private SanPhamChiTietRepo _sanPhamChiTietRepository;
    @Autowired
    private MauSacRepo _mauSacRepo;
    @Autowired
    private ThietKeRepository _thietKeRepo;
    @Autowired
    private ChatLieuRepository _chatLieuRepo;
    @Autowired
    private NhomSanPhamRepository _nhomSanPhamRepo;
    @Autowired
    private BrandRepo _brandRepo;

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
            list.sort(Comparator.comparing(SanPham::getNgayTao).reversed());
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

    @Override
    public FullThuocTinh layHetThuocTinh() {
        return new FullThuocTinh(_mauSacRepo.findAll(), _nhomSanPhamRepo.findAll(), _chatLieuRepo.findAll(), _thietKeRepo.findAll(), _brandRepo.findAll());
    }

    @Override
    public ResponObject<String, APIStatus> themSanPham(SanPham sanPham) {
        sanPham.setMaSanPham(UUID.randomUUID().toString());
        sanPham.setNgayTao(LocalDate.now());
        sanPham.setGiaBan(400000d);
        sanPham.setGiaNhap(200000d);
        sanPham.setNhomSanPham(_nhomSanPhamRepo.findById(1l).get());
        sanPham.setBrand(_brandRepo.findById(1l).get());
        sanPham.setChatLieu(_chatLieuRepo.findById(1l).get());
        sanPham.setThietKe(_thietKeRepo.findById(1l).get());
        sanPham.setHinhAnh2("https://cdn.tgdd.vn/Files/2021/05/12/1350971/dac-diem-nhan-dien-cach-nuoi-meo-anh-long-dai-202206061133420222.jpg");
        sanPham.setHinhAnh1("https://vcdn1-giaitri.vnecdn.net/2023/02/14/327830037-584328516895893-1293-7525-9147-1676366463.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=iB7KPom6wRcnQN4G0sui0A");
        _sanPhamRepository.save(sanPham);
        return new ResponObject<String, APIStatus>("Thành công", APIStatus.THANHCONG, "Thành công");
    }
}
