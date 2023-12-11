package it.lab.service;

import it.lab.common.CloudinaryUpload;
import it.lab.common.Page;
import it.lab.common.ResponObject;
import it.lab.dto.NguoiDungDTO;
import it.lab.entity.NguoiDung;
import it.lab.enums.APIStatus;
import it.lab.enums.CapNhat;
import it.lab.enums.TrangThaiNguoiDung;
import it.lab.iservice.INguoiDungService;
import it.lab.modelcustom.request.DoiMatKhau;
import it.lab.modelcustom.request.NguoiDungRequest;
import it.lab.repository.NguoiDungRepo;
import it.lab.repository.RankKhachHangRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class NguoiDungService implements INguoiDungService {
    @Autowired
    private NguoiDungRepo _nguoiDungRepo;
    @Autowired
    private PasswordEncoder _bcrypt;

    @Autowired
    private RankKhachHangRepo _rankKhachHangRepo;

    @Override
    public Page<NguoiDungDTO> layHetNguoiDung() {
        return new Page<NguoiDungDTO>(NguoiDungDTO.fromCollection(_nguoiDungRepo.findAll()), 0, 10000);
    }

    @Override
    public NguoiDungDTO layThongTinTaiKhoanById(Long id) {
        return NguoiDungDTO.fromEntity(_nguoiDungRepo.findById(id).orElse(null));
    }

    @Override
    public ResponObject<String, APIStatus> capNhatNguoiDung(NguoiDungRequest nguoiDungRequest,MultipartFile anhdaidien) throws IOException {
        Optional<NguoiDung> ng = _nguoiDungRepo.findById(nguoiDungRequest.getId());
        if (ng.isEmpty()) {
            return new ResponObject<String, APIStatus>(null, APIStatus.THATBAI, "Thất bại");
        }
        NguoiDung nguoiDungRepo = ng.get();
        nguoiDungRepo.setTen(nguoiDungRequest.getTen());
        nguoiDungRepo.setHo(nguoiDungRequest.getHo());
        nguoiDungRepo.setMatKhau(nguoiDungRequest.getMatKhau());
        nguoiDungRepo.setEmail(nguoiDungRequest.getEmail());
        nguoiDungRepo.setSoDienThoai(nguoiDungRequest.getSoDienThoai());
        nguoiDungRepo.setGioiTinh(nguoiDungRequest.getGioiTinh());
        nguoiDungRepo.setDiem(nguoiDungRequest.getDiem());
        nguoiDungRepo.setAnhDaiDien(CloudinaryUpload.uploadFile(anhdaidien));
        nguoiDungRepo.setTrangThai(nguoiDungRequest.getTrangThaiNguoiDung());
//        nguoiDungRepo.setRankKhachHang(_rankKhachHangRepo.findById(nguoiDungRequest.getRankKhachHangId()).get());
        nguoiDungRepo.setNgayCapNhat(LocalDateTime.now());
        _nguoiDungRepo.save(nguoiDungRepo);
        return new ResponObject<String, APIStatus>("Thành công", APIStatus.THANHCONG, "Thành công");
    }

    @Override
    public ResponObject<NguoiDungDTO, CapNhat> doiMatKhau(DoiMatKhau matKhau) {
        Optional<NguoiDung> ng = _nguoiDungRepo.findById(matKhau.getNguoiDungId());
        if (ng.isEmpty()) {
            return new ResponObject<>(null, CapNhat.THATBAI, "Thất bại");
        }
        NguoiDung nguoiDungRepo = ng.get();
        String matKhauMaHoa = _bcrypt.encode(matKhau.getMatKhauCu());
        if (!matKhauMaHoa.equals(nguoiDungRepo.getMatKhau())) {
            return new ResponObject<>(null, CapNhat.MATKHAUCUSAI, "Thất bại");
        }
        nguoiDungRepo.setMatKhau(_bcrypt.encode(matKhau.getMatKhauMoi()));
        nguoiDungRepo.setNgayCapNhat(LocalDateTime.now());
        _nguoiDungRepo.save(nguoiDungRepo);
        return new ResponObject<>(NguoiDungDTO.fromEntity(nguoiDungRepo), CapNhat.THANHCONG, "Thành công");
    }

    @Override
    public Page<NguoiDungDTO> xoaNguoiDung(Long nguoiDungId) {
        _nguoiDungRepo.deleteById(nguoiDungId);
        return layHetNguoiDung();
    }

//    @Override
//    public Page<NguoiDungDTO> themNguoiDung(NguoiDung nguoiDung) {
//        nguoiDung.setNgayTao(LocalDateTime.now());
//        _nguoiDungRepo.save(nguoiDung);
//        nguoiDung.setMaNguoiDung("MEM" + nguoiDung.getId());
//        nguoiDung.setTen(nguoiDung.getTen());
//        nguoiDung.setHo(nguoiDung.getHo());
//        nguoiDung.setEmail(nguoiDung.getEmail());
//        nguoiDung.setMatKhau(nguoiDung.getMatKhau());
//        nguoiDung.setAnhDaiDien(nguoiDung.getAnhDaiDien());
//        nguoiDung.setRankKhachHang(nguoiDung.getRankKhachHang());
//        nguoiDung.setSoDienThoai(nguoiDung.getSoDienThoai());
//        nguoiDung.setNgayCapNhat(nguoiDung.getNgayCapNhat());
//        nguoiDung.setTrangThai(nguoiDung.getTrangThai());
//        nguoiDung.setGioiTinh(nguoiDung.getGioiTinh());
//        _nguoiDungRepo.save(nguoiDung);
//        return layHetNguoiDung();
//    }

    @Override
    public ResponObject<String, APIStatus> themNguoiDung(NguoiDungRequest nguoiDungRequest, MultipartFile anhdaidien) throws IOException {
        NguoiDung nguoiDung = new NguoiDung();
        nguoiDung.setNgayTao(LocalDateTime.now());
        nguoiDung.setTen(nguoiDungRequest.getTen());
        nguoiDung.setHo(nguoiDungRequest.getHo());
        nguoiDung.setDiem(nguoiDungRequest.getDiem());
        nguoiDung.setEmail(nguoiDungRequest.getEmail());
        nguoiDung.setMatKhau(nguoiDungRequest.getMatKhau());
        nguoiDung.setRankKhachHang(_rankKhachHangRepo.findById(nguoiDungRequest.getRankKhachHangId()).get());
        nguoiDung.setSoDienThoai(nguoiDungRequest.getSoDienThoai());
        nguoiDung.setTrangThai(TrangThaiNguoiDung.HOATDONG);
        nguoiDung.setGioiTinh(nguoiDungRequest.getGioiTinh());
        nguoiDung.setAnhDaiDien(CloudinaryUpload.uploadFile(anhdaidien));
        _nguoiDungRepo.save(nguoiDung);
        nguoiDung.setMaNguoiDung("ND" + nguoiDung.getId());
        _nguoiDungRepo.save(nguoiDung);
        return new ResponObject<String, APIStatus>("Thành công", APIStatus.THANHCONG, "Thành công");
    }
}
