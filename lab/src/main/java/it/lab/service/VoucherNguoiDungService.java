package it.lab.service;

import it.lab.entity.NguoiDung;
import it.lab.entity.NguoiDungVoucher;
import it.lab.entity.Voucher;
import it.lab.repository.NguoiDungRepo;
import it.lab.repository.NguoiDungVoucherRepo;
import it.lab.repository.VoucherRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class VoucherNguoiDungService {
    @Autowired
    private NguoiDungVoucherRepo nguoiDungVoucherRepo;
    @Autowired
    private VoucherRepo voucherRepo;
    @Autowired
    private NguoiDungRepo nguoiDungRepo;

    public void themVoucherChoNguoiDung(Long nguoiDungId, Long voucherId) {
        // Kiểm tra xem người dùng và voucher có tồn tại không
        NguoiDung nguoiDung = nguoiDungRepo.findById(nguoiDungId).orElse(null);
        Voucher voucher = voucherRepo.findById(voucherId).orElse(null);

        if (nguoiDung != null && voucher != null) {
            // Tạo mối quan hệ giữa người dùng và voucher
            NguoiDungVoucher nguoiDungVoucher = new NguoiDungVoucher();
            nguoiDungVoucher.setNguoiDung(nguoiDung);
            nguoiDungVoucher.setVoucher(voucher);

            // Thêm voucher cho người dùng
            nguoiDungVoucherRepo.save(nguoiDungVoucher);

            // Giảm số lượng của voucher đi 1 nếu soLuong không phải là null
            Integer soLuong = voucher.getSoLuong();
            if (soLuong != null && soLuong > 0) {
                voucher.setSoLuong(soLuong - 1);
                voucherRepo.save(voucher);
            } else {
                // Xử lý trường hợp số lượng voucher không hợp lệ
                // Có thể ném một exception hoặc thực hiện các xử lý khác tùy thuộc vào yêu cầu
            }
        } else {
            // Xử lý trường hợp người dùng hoặc voucher không tồn tại
            // Có thể ném một exception hoặc thực hiện các xử lý khác tùy thuộc vào yêu cầu
        }
    }


}
