package it.lab.service;

import it.lab.common.ResponObject;
import it.lab.dto.NguoiDungDTO;
import it.lab.entity.NguoiDung;
import it.lab.enums.CapNhat;
import it.lab.iservice.INguoiDungService;
import it.lab.iservice.TestService;
import it.lab.modelcustom.NguoiDungCustom;
import it.lab.repository.NguoiDungRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class NguoiDungService implements INguoiDungService {
    @Autowired
    private NguoiDungRepo _nguoiDungRepo;


    @Override
    public NguoiDungDTO layThongTinTaiKhoanById(Long id) {
        return NguoiDungDTO.fromEntity(_nguoiDungRepo.findById(id).orElse(null));
    }

    @Override
    public ResponObject<NguoiDungDTO, CapNhat> capNhatNguoiDung(NguoiDungDTO nguoiDung) {
        Optional<NguoiDung> ng = _nguoiDungRepo.findById(nguoiDung.getId());
        if (ng.isEmpty()) {
            return new ResponObject<>(null, CapNhat.THATBAI, "Thất bại");
        }
        NguoiDung nguoiDungRepo = ng.get();
        nguoiDungRepo.setGioiTinh(nguoiDung.getGioiTinh());
        nguoiDungRepo.setHo(nguoiDung.getHo());
        nguoiDungRepo.setTen(nguoiDung.getTen());
        nguoiDungRepo.setNgayCapNhat(LocalDate.now());
        _nguoiDungRepo.save(nguoiDungRepo);
        return new ResponObject<>(NguoiDungDTO.fromEntity(nguoiDungRepo), CapNhat.THANHCONG, "Thành công");
    }
}
