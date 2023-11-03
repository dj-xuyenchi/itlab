package it.lab.service;

import it.lab.common.CloudinaryUpload;
import it.lab.common.Page;
import it.lab.common.ResponObject;
import it.lab.dto.ChatLieuDTO;
import it.lab.dto.SanPhamChiTietDTO;
import it.lab.dto.SanPhamDTO;
import it.lab.entity.ChatLieu;
import it.lab.entity.HinhAnhSanPham;
import it.lab.entity.MauSac;
import it.lab.entity.SanPham;
import it.lab.enums.APIStatus;
import it.lab.enums.TrangThaiSanPham;
import it.lab.iservice.ISanPhamService;
import it.lab.modelcustom.request.SanPhamRequest;
import it.lab.modelcustom.respon.FullThuocTinh;
import it.lab.modelcustom.respon.SanPhamChiTiet;
import it.lab.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    private HinhAnhSanPhamRepository _hinhAnhSanPhamRepo;

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
        list = list.stream().filter(x -> x.getTrangThai() == TrangThaiSanPham.DANGBAN).toList();
        if (thietKeId != null) {
            list = list.stream().filter(x -> x.getThietKe().getId() == thietKeId).toList();
        }
        if (chatLieuId != null) {
            list = list.stream().filter(x -> x.getChatLieu().getId() == chatLieuId).toList();
        }
        if (loaiSanPhamId != null) {
            list = list.stream().filter(x -> x.getNhomSanPham().getId() == loaiSanPhamId).toList();
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
    public Page<ChatLieuDTO> layHetChatLieu() {
        return new Page<ChatLieuDTO>(ChatLieuDTO.fromCollection(_chatLieuRepo.findAll()), 0, 10000);
    }

    @Override
    public Page<ChatLieuDTO> xoaChatLieu(Long chatLieuId) {
        _chatLieuRepo.deleteById(chatLieuId);
        return layHetChatLieu();
    }

    @Override
    public Page<ChatLieuDTO> suaChatLieu(ChatLieu chatLieu) {
        ChatLieu chatLieuGoc = _chatLieuRepo.findById(chatLieu.getId()).get();
        chatLieuGoc.setTenChatLieu(chatLieu.getTenChatLieu());
        chatLieuGoc.setNgayCapNhat(LocalDate.now());
        _chatLieuRepo.save(chatLieuGoc);
        return layHetChatLieu();
    }

    @Override
    public Page<ChatLieuDTO> themChatLieu(ChatLieu chatLieu) {
        chatLieu.setNgayTao(LocalDate.now());
        _chatLieuRepo.save(chatLieu);
        chatLieu.setMaChatLieu("CL" + chatLieu.getId());
        _chatLieuRepo.save(chatLieu);
        return layHetChatLieu();
    }

    @Override
    public FullThuocTinh layHetThuocTinh() {
        return new FullThuocTinh(_mauSacRepo.findAll(), _nhomSanPhamRepo.findAll(), _chatLieuRepo.findAll(), _thietKeRepo.findAll());
    }

    @Override
    public ChatLieuDTO layChatLieuById(Long chatLieuId) {
        return ChatLieuDTO.fromEntity(_chatLieuRepo.findById(chatLieuId).get());
    }

    @Override
    public ResponObject<String, APIStatus> themSanPham(SanPhamRequest sanPhamRequest, MultipartFile hinh1, MultipartFile hinh2) throws IOException {
        SanPham sanPham = new SanPham();
        sanPham.setNgayTao(LocalDate.now());
        sanPham.setGiaBan(sanPhamRequest.getGiaBan());
        sanPham.setSoLuongTon(sanPhamRequest.getSoLuongTon());
        sanPham.setTrangThai(TrangThaiSanPham.DANGBAN);
        sanPham.setTenSanPham(sanPhamRequest.getTenSanPham());
        sanPham.setGiaNhap(sanPhamRequest.getGiaNhap());
        sanPham.setNhomSanPham(_nhomSanPhamRepo.findById(sanPhamRequest.getNhomSanPhamId()).get());
        sanPham.setChatLieu(_chatLieuRepo.findById(sanPhamRequest.getChatLieuId()).get());
        sanPham.setThietKe(_thietKeRepo.findById(sanPhamRequest.getThietKeId()).get());
        sanPham.setHinhAnh1(CloudinaryUpload.uploadFile(hinh1));
        sanPham.setHinhAnh2(CloudinaryUpload.uploadFile(hinh2));
        HinhAnhSanPham hinhAnh1 = new HinhAnhSanPham();
        hinhAnh1.setLinkHinhAnh(sanPham.getHinhAnh1());
        hinhAnh1.setSanPham(sanPham);
        hinhAnh1.setNgayTao(LocalDate.now());
        HinhAnhSanPham hinhAnh2 = new HinhAnhSanPham();
        hinhAnh2.setLinkHinhAnh(sanPham.getHinhAnh2());
        hinhAnh2.setSanPham(sanPham);
        hinhAnh2.setNgayTao(LocalDate.now());
        _sanPhamRepository.save(sanPham);
        _hinhAnhSanPhamRepo.save(hinhAnh1);
        _hinhAnhSanPhamRepo.save(hinhAnh2);
        sanPham.setMaSanPham("SP" + sanPham.getId());
        _sanPhamRepository.save(sanPham);
        return new ResponObject<String, APIStatus>("Thành công", APIStatus.THANHCONG, "Thành công");
    }
}
