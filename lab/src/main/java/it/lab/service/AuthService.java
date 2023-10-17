package it.lab.service;

import it.lab.common.ResponObject;
import it.lab.dto.NguoiDungDTO;
import it.lab.entity.NguoiDung;
import it.lab.enums.TrangThaiNguoiDung;
import it.lab.iservice.IAuthService;
import it.lab.repository.NguoiDungRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class AuthService implements IAuthService {
    @Autowired
    private NguoiDungRepo _nguNguoiDungRepo;

    @Override
    public ResponObject<NguoiDungDTO> dangKyTaiKhoan(NguoiDung nguoiDung) {
        NguoiDung ng = new NguoiDung();
        ng.setMatKhau(new BCryptPasswordEncoder().encode(nguoiDung.getMatKhau()));
        ng.setEmail(nguoiDung.getEmail());
        ng.setNgayTao(LocalDate.now());
        ng.setTrangThai(TrangThaiNguoiDung.HOATDONG);
        _nguNguoiDungRepo.save(ng);
        return new ResponObject<>(NguoiDungDTO.fromEntity(ng), "Thêm thành công");
    }
}
