package it.lab.controller;
//import java.util.UUID;
import java.util.List;
import java.util.Random;

import it.lab.entity.Voucher;
import it.lab.enums.LoaiGiam;
import it.lab.enums.TrangThaiVoucher;

import it.lab.repository.NguoiDungRepo;
import it.lab.repository.VoucherRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/voucher")
public class VoucherController {
    @Autowired
    VoucherRepo voucherRepo;

    @Autowired
    NguoiDungRepo nguoiDungRepo;
    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public ResponseEntity<?> layDuLieu() throws IOException {
        return ResponseEntity.ok(voucherRepo.findAll());
    }
//


    @PostMapping(value = "/addVoucher")
    public Voucher create(@RequestBody Voucher voucher) {
        if (voucher.getTrangThai() == null) {
            voucher.setTrangThai(TrangThaiVoucher.DIENRA);
        }if (voucher.getLoaiGiam().equals(LoaiGiam.GIAMTHANG) ){
            voucher.setLoaiGiam(LoaiGiam.GIAMTHANG);
        }else {
            voucher.setLoaiGiam(LoaiGiam.PHANTRAM);
        }
        // Tạo một chuỗi random từ các ký tự số, chữ cái và ký tự đặc biệt
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder randomPart = new StringBuilder();
        Random random = new Random();
        int length = 8 + random.nextInt(3);  // Độ dài từ 8 đến 10 ký tự
        for (int i = 0; i < length; i++) {
            randomPart.append(characters.charAt(random.nextInt(characters.length())));
        }

        // Kết hợp với chuỗi thông thường
        voucher.setMaVoucher( randomPart.toString());

//        voucher.setMaVoucher("V" + System.currentTimeMillis());
//        voucher.setMaVoucher(UUID.randomUUID().toString());
        voucher.setNgayTao(LocalDate.now());
        return voucherRepo.save(voucher);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Voucher> update( @RequestBody Voucher newVoucher,@PathVariable Long id) {
        Optional<Voucher> OV = voucherRepo.findById(id);
        if (OV.isPresent()) {
            Voucher oldVoucher = OV.get();
            oldVoucher.setLoaiGiam(newVoucher.getLoaiGiam());
            oldVoucher.setGiaTriGiam(newVoucher.getGiaTriGiam());
            oldVoucher.setMaVoucher(newVoucher.getMaVoucher());
            oldVoucher.setSoLuong(newVoucher.getSoLuong());
            oldVoucher.setTenVoucher(newVoucher.getTenVoucher());
            oldVoucher.setNgayCapNhat(LocalDate.now());
            voucherRepo.save(oldVoucher);

            return new ResponseEntity<>(oldVoucher, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }@PatchMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Voucher> voucher = voucherRepo.findById(id);

        if (voucher.isPresent()) {
            Voucher existingVoucher = voucher.get();
            if (  existingVoucher.getTrangThai() == TrangThaiVoucher.DIENRA ) {
                existingVoucher.setTrangThai(TrangThaiVoucher.NGUNG);
                voucherRepo.save(existingVoucher);

                return new ResponseEntity<>(existingVoucher, HttpStatus.OK);
            } else {
                existingVoucher.setTrangThai(TrangThaiVoucher.DIENRA);
                voucherRepo.save(existingVoucher);
                return new ResponseEntity<>(existingVoucher, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>("Voucher not found", HttpStatus.NOT_FOUND);
        }
    }

//    @GetMapping("/searchByName")
//    public List<Voucher> searchByName(@RequestParam String tenVoucher) {
//        return IvoucherService.searchByName(tenVoucher);
//    }
}

