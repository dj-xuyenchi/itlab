package it.lab.service;

import it.lab.common.CloudinaryUpload;
import it.lab.common.Page;
import it.lab.common.ResponObject;
import it.lab.dto.DiaChiDTO;
import it.lab.dto.NguoiDungDTO;
import it.lab.entity.DiaChi;
import it.lab.entity.NguoiDung;
import it.lab.enums.APIStatus;
import it.lab.enums.CapNhat;
import it.lab.enums.TrangThaiDiaChi;
import it.lab.enums.TrangThaiNguoiDung;
import it.lab.iservice.INguoiDungService;
import it.lab.modelcustom.request.DiaChiRequest;
import it.lab.modelcustom.request.DoiMatKhau;
import it.lab.modelcustom.request.NguoiDungRequest;
import it.lab.repository.DiaChiRepo;
import it.lab.repository.NguoiDungRepo;
import it.lab.repository.RankKhachHangRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
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
    @Autowired
    private DiaChiRepo _diaChiRepo;

    @Override
    public Page<NguoiDungDTO> layHetNguoiDung() {
        return new Page<NguoiDungDTO>(NguoiDungDTO.fromCollection(_nguoiDungRepo.findAll()), 0, 10000);
    }

    @Override
    public NguoiDungDTO layThongTinTaiKhoanById(Long id) {
        return NguoiDungDTO.fromEntity(_nguoiDungRepo.findById(id).orElse(null));
    }

    @Override
    public ResponObject<String, APIStatus> capNhatNguoiDung(NguoiDungRequest nguoiDungRequest, MultipartFile anhdaidien) throws IOException {
        Optional<NguoiDung> ng = _nguoiDungRepo.findById(nguoiDungRequest.getId());
        if (ng.isEmpty()) {
            return new ResponObject<String, APIStatus>(null, APIStatus.THATBAI, "Thất bại");
        }
        NguoiDung nguoiDung = ng.get();
        nguoiDung.setTen(nguoiDungRequest.getTen());
        nguoiDung.setHo(nguoiDungRequest.getHo());
        nguoiDung.setMatKhau(_bcrypt.encode(nguoiDungRequest.getMatKhau()));
        nguoiDung.setEmail(nguoiDungRequest.getEmail());
        nguoiDung.setSoDienThoai(nguoiDungRequest.getSoDienThoai());
        nguoiDung.setGioiTinh(nguoiDungRequest.getGioiTinh());
        if (!(anhdaidien == null)) {
            nguoiDung.setAnhDaiDien(CloudinaryUpload.uploadFile(anhdaidien));
        }
        nguoiDung.setTrangThai(nguoiDungRequest.getTrangThai());
        nguoiDung.setNgayCapNhat(LocalDateTime.now());
        _nguoiDungRepo.save(nguoiDung);
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
        try {
            _nguoiDungRepo.deleteById(nguoiDungId);
            return layHetNguoiDung();
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<DiaChiDTO> layDiaChiNguoiDung(Long nguoiDungId) {
        NguoiDung ng = _nguoiDungRepo.findById(nguoiDungId).get();
        return DiaChiDTO.fromCollection(_diaChiRepo.findDiaChisByNguoiDung(ng));
    }


    @Transactional
    @Override
    public ResponObject<String, APIStatus> capNhatDiaChiMacDinh(Long nguoiDungId, Long diaChiId) {
        NguoiDung nguoiDung = _nguoiDungRepo.findById(nguoiDungId)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy người dùng với ID: " + nguoiDungId));
        List<DiaChi> diaChiList = _diaChiRepo.findDiaChisByNguoiDung(nguoiDung);
        DiaChi diaChiMacDinhHienTai = diaChiList.stream()
                .filter(DiaChi::getLaDiaChiChinh)
                .findFirst()
                .orElse(null);
        if (diaChiMacDinhHienTai != null && !diaChiMacDinhHienTai.getId().equals(diaChiId)) {
            diaChiMacDinhHienTai.setLaDiaChiChinh(false);
            _diaChiRepo.save(diaChiMacDinhHienTai);
        }
        DiaChi diaChiMoi = _diaChiRepo.findById(diaChiId)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy địa chỉ với ID: " + diaChiId));

        diaChiMoi.setLaDiaChiChinh(true);
        _diaChiRepo.save(diaChiMoi);

        return new ResponObject<String, APIStatus>("Cập nhật thành công", APIStatus.THANHCONG, "Thành công");
    }


    @Override
    public ResponObject<String, APIStatus> themDiaChi(DiaChiRequest diaChiRequest) {
        try {
            if (!_nguoiDungRepo.existsById(diaChiRequest.getNguoiDungId())) {
                return new ResponObject<String, APIStatus>("Thất bại", APIStatus.THATBAI, "Người dùng không tồn tại");
            }
            DiaChi diaChi = new DiaChi();
            diaChi.setNgayTao(LocalDateTime.now());
            diaChi.setNguoiDung(_nguoiDungRepo.findById(diaChiRequest.getNguoiDungId()).orElse(null));
            diaChi.setNguoiNhan(diaChiRequest.getNguoiNhan());
            diaChi.setHoNguoiNhan(diaChiRequest.getHoNguoiNhan());
            diaChi.setXaId(diaChiRequest.getXaId());
            diaChi.setHuyenId(diaChiRequest.getHuyenId());
            diaChi.setTinhId(diaChiRequest.getTinhId());
            diaChi.setXa(diaChiRequest.getXa());
            diaChi.setHuyen(diaChiRequest.getHuyen());
            diaChi.setTinh(diaChiRequest.getTinh());
            diaChi.setSoDienThoai(diaChiRequest.getSoDienThoai());
            diaChi.setChiTietDiaChi(diaChiRequest.getChiTietDiaChi());
            diaChi.setLaDiaChiChinh(diaChiRequest.getLaDiaChiChinh());
            diaChi.setTrangThai(TrangThaiDiaChi.HOATDONG);
            _diaChiRepo.save(diaChi);

            return new ResponObject<String, APIStatus>("Thành công", APIStatus.THANHCONG, "Thêm địa chỉ thành công");
        } catch (Exception e) {
            return new ResponObject<String, APIStatus>("Lỗi server", APIStatus.THATBAI, "Có lỗi xảy ra khi thêm địa chỉ");
        }
    }

    @Override
    public ResponObject<String, APIStatus> capNhatDiaChi(DiaChiRequest diaChiRequest) {
        try {
            DiaChi diaChi = _diaChiRepo.findById(diaChiRequest.getId())
                    .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy địa chỉ với ID: " + diaChiRequest.getId()));

            diaChi.setNguoiNhan(diaChiRequest.getNguoiNhan());
            diaChi.setHoNguoiNhan(diaChiRequest.getHoNguoiNhan());
            diaChi.setXaId(diaChiRequest.getXaId());
            diaChi.setHuyenId(diaChiRequest.getHuyenId());
            diaChi.setTinhId(diaChiRequest.getTinhId());
            diaChi.setXa(diaChiRequest.getXa());
            diaChi.setHuyen(diaChiRequest.getHuyen());
            diaChi.setTinh(diaChiRequest.getTinh());
            diaChi.setSoDienThoai(diaChiRequest.getSoDienThoai());
            diaChi.setChiTietDiaChi(diaChiRequest.getChiTietDiaChi());
            _diaChiRepo.save(diaChi);

            return new ResponObject<String, APIStatus>("Thành công", APIStatus.THANHCONG, "Cập nhật địa chỉ thành công");
        } catch (EntityNotFoundException e) {
            return new ResponObject<String, APIStatus>("Thất bại", APIStatus.THATBAI, e.getMessage());
        } catch (Exception e) {
            return new ResponObject<String, APIStatus>("Lỗi", APIStatus.THATBAI, "Có lỗi xảy ra khi cập nhật địa chỉ: " + e.getMessage());
        }
    }


    @Override
    public ResponObject<String, APIStatus> themNguoiDung(NguoiDungRequest nguoiDungRequest, MultipartFile anhdaidien) throws IOException {
        if (_nguoiDungRepo.existsByEmailContains(nguoiDungRequest.getEmail())) {
            return new ResponObject<String, APIStatus>("Thành công", APIStatus.THATBAI, "Đã tồn tại email");
        }
        NguoiDung nguoiDung = new NguoiDung();
        nguoiDung.setNgayTao(LocalDateTime.now());
        nguoiDung.setTen(nguoiDungRequest.getTen());
        nguoiDung.setHo(nguoiDungRequest.getHo());
        nguoiDung.setEmail(nguoiDungRequest.getEmail());
        nguoiDung.setMatKhau(nguoiDungRequest.getMatKhau());
        nguoiDung.setSoDienThoai(nguoiDungRequest.getSoDienThoai());
        nguoiDung.setTrangThai(TrangThaiNguoiDung.HOATDONG);
        nguoiDung.setGioiTinh(nguoiDungRequest.getGioiTinh());
        nguoiDung.setAnhDaiDien(CloudinaryUpload.uploadFile(anhdaidien));
        _nguoiDungRepo.save(nguoiDung);
        nguoiDung.setMaNguoiDung("MEM" + nguoiDung.getId());
        _nguoiDungRepo.save(nguoiDung);
        return new ResponObject<String, APIStatus>("Thành công", APIStatus.THANHCONG, "Thành công");
    }
}
