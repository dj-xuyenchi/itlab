package it.lab.service;

import it.lab.dto.VoucherDTO;
import it.lab.entity.Voucher;
import it.lab.enums.TrangThaiVoucher;
import it.lab.iservice.IVoucherService;
import it.lab.repository.VoucherRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VoucherService2 implements IVoucherService {
    @Autowired
    private VoucherRepo _voucherRepo;
    private static final String CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    @Override
    public void themVoucher(VoucherDTO voucher) {
        voucher.setMaVoucher(generateRandomString());
        voucher.setNgayTao(LocalDateTime.now());
        voucher.setTrangThai(TrangThaiVoucher.DIENRA);
        _voucherRepo.save(voucher.toEntity());
    }


    public static String generateRandomString() {
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(10);

        for (int i = 0; i < 10; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            char randomChar = CHARACTERS.charAt(randomIndex);
            sb.append(randomChar);
        }
        return sb.toString().toUpperCase();
    }

    @Override
    public void suaVoucher(VoucherDTO voucher) {
        voucher.setNgayCapNhat(LocalDateTime.now());
        _voucherRepo.save(voucher.toEntity());
    }

    @Override
    public void xoaVoucher(Long voucherId) {
        Voucher voucher = _voucherRepo.findById(voucherId).get();
        voucher.setTrangThai(TrangThaiVoucher.NGUNG);
        _voucherRepo.save(voucher);
    }

    @Override
    public List<VoucherDTO> layVoucher() {
        return _voucherRepo
                .findAll().stream()
                .map(x -> {
                    return VoucherDTO.fromEntity(x);
                }).collect(Collectors.toList());
    }
}
