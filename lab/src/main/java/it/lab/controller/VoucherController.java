package it.lab.controller;

import it.lab.entity.Voucher;
import it.lab.enums.TrangThaiVoucher;
import it.lab.repository.VoucherRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/voucher")
public class VoucherController {

    @Autowired
    private VoucherRepo voucherRepository;

    @GetMapping
    public Page<Voucher> getAllVouchers(@RequestParam(defaultValue = "0") int page,
                                        @RequestParam(defaultValue = "8") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return voucherRepository.findAll(pageable);
    }

//tìm kiếm theo tên

    @GetMapping("/search")
    public Page<Voucher> searchVouchersByTenVoucherPaged(@RequestParam(required = false, name = "tenVoucher") String tenVoucher,
                                                         @RequestParam(defaultValue = "0") int page,
                                                         @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return voucherRepository.searchByTenPage(tenVoucher, pageable);
    }


    //them mới voucher
    @PostMapping(value = "/add")
    public Voucher createVoucher(@RequestBody Voucher voucher) {
        if (voucher.getTrangThai() == null) {
            voucher.setTrangThai(TrangThaiVoucher.DIENRA);
        }
        // Đặt giá trị cho trường ngayTao là thời điểm hiện tại
        voucher.setNgayTao(LocalDate.now());
        return voucherRepository.save(voucher);
    }


    //put voucher
    @PutMapping("/{id}")
    public ResponseEntity<Voucher> updateVoucher(@PathVariable Long id, @RequestBody Voucher updatedVoucher) {
        Optional<Voucher> existingVoucherOptional = voucherRepository.findById(id);

        if (existingVoucherOptional.isPresent()) {
            Voucher existingVoucher = existingVoucherOptional.get();

            // Cập nhật các trường cần thiết của Voucher
            existingVoucher.setTenVoucher(updatedVoucher.getTenVoucher());
            existingVoucher.setTrangThai(updatedVoucher.getTrangThai());
            existingVoucher.setNgayCapNhat(LocalDate.now());
            // Cập nhật trong cơ sở dữ liệu
            voucherRepository.save(existingVoucher);

            return new ResponseEntity<>(existingVoucher, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


//    @PatchMapping("/ap-dung/{id}")
//    public ResponseEntity<?> updateVoucherTrangThaiApDungHoatDong(@PathVariable Long id) {
//        Optional<Voucher> existingVoucherOptional = voucherRepository.findById(id);
//
//        if (existingVoucherOptional.isPresent()) {
//            Voucher existingVoucher = existingVoucherOptional.get();
//
//            // Kiểm tra xem trạng thái hiện tại có phải là CHUADIENRA hoặc APDUNG không
//            if (existingVoucher.getTrangThai() == TrangThaiVoucher.CHUADIENRA || existingVoucher.getTrangThai() == TrangThaiVoucher.NGUNG) {
//                // Cập nhật trạng thái thành NGUNGHOATDONG
//                existingVoucher.setTrangThai(TrangThaiVoucher.APDUNG);
//
//                // Lưu cập nhật vào cơ sở dữ liệu
//                voucherRepository.save(existingVoucher);
//
//                return new ResponseEntity<>(existingVoucher, HttpStatus.OK);
//            } else {
//                return new ResponseEntity<>("Không thể ngưng hoạt động cho voucher có trạng thái hiện tại.", HttpStatus.BAD_REQUEST);
//            }
//        } else {
//            return new ResponseEntity<>("Voucher not found", HttpStatus.NOT_FOUND);
//        }
//    }
    @PatchMapping("/ngung/{id}")
    public ResponseEntity<?> updateVoucherTrangThaiNgungHoatDong(@PathVariable Long id) {
        Optional<Voucher> existingVoucherOptional = voucherRepository.findById(id);

        if (existingVoucherOptional.isPresent()) {
            Voucher existingVoucher = existingVoucherOptional.get();

            // Kiểm tra xem trạng thái hiện tại có phải là CHUADIENRA hoặc APDUNG không
            if (  existingVoucher.getTrangThai() == TrangThaiVoucher.DIENRA ) {
                // Cập nhật trạng thái thành NGUNGHOATDONG
                existingVoucher.setTrangThai(TrangThaiVoucher.NGUNG);

                // Lưu cập nhật vào cơ sở dữ liệu
                voucherRepository.save(existingVoucher);

                return new ResponseEntity<>(existingVoucher, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(existingVoucher, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>("Voucher not found", HttpStatus.NOT_FOUND);
        }
    }

}








