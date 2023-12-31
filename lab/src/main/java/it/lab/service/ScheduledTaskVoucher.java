package it.lab.service;
import it.lab.entity.Voucher;
import it.lab.enums.TrangThaiVoucher;
import it.lab.repository.VoucherRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Component
public class ScheduledTaskVoucher {

    @Autowired
    private VoucherRepo voucherRepo;
    @Scheduled(fixedRate = 15 * 60 * 1000)
    public void changeStatus() {
        LocalDateTime currentDateTime = LocalDateTime.now();

        // Lấy tất cả voucher có ngày kết thúc sau ngày hiện tại
        List<Voucher> vouchersToChangeStatus = voucherRepo.findVouchersWithEndDateAfter(currentDateTime);

        for (Voucher voucher : vouchersToChangeStatus) {
            // Thay đổi trạng thái thành "Ngung"
            voucher.setTrangThai(TrangThaiVoucher.NGUNG);
        }

        // Lưu các thay đổi vào cơ sở dữ liệu
        voucherRepo.saveAll(vouchersToChangeStatus);
    }
}
