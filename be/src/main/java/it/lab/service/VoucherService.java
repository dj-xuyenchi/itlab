package it.lab.service;

import it.lab.common.ResponObject;
import it.lab.entity.Voucher;
import it.lab.enums.APIStatus;
import it.lab.iservice.iVoucherService;
import it.lab.repository.VoucherRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VoucherService implements iVoucherService {
    @Autowired
    VoucherRepo voucherRepo;

    @Override
    public List<Voucher> searchByName(String tenVoucher) {
        // Sử dụng repository để thực hiện tìm kiếm theo tên
        return voucherRepo.searchByName(tenVoucher);
    }

    @Override
    public ResponObject layGioHang(Long maVoucher) {
        Optional<Voucher> vo = voucherRepo.findById(maVoucher);
        if (vo.isEmpty()) {
            return new ResponObject<Voucher, APIStatus>(null, APIStatus.THATBAI, "Không tìm thấy mã");
        }
        return new ResponObject<>(vo, APIStatus.THANHCONG, "Thành công");
    }

    @Override
    public ResponObject<Voucher, APIStatus> layVoucherTheoMa(Long maVoucher) {

        return null;
    }

    @Override
    public ResponObject<String, APIStatus> themVoucher(Voucher voucher) {
        Voucher vo = new Voucher();
        voucherRepo.save(vo);

        return new ResponObject<>("Thành công", APIStatus.THANHCONG, "Thành công!");
    }
}
