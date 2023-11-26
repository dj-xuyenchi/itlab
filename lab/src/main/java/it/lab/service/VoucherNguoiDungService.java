package it.lab.service;

import it.lab.entity.NguoiDung;
import it.lab.entity.NguoiDungVoucher;
import it.lab.entity.Voucher;
import it.lab.enums.TrangThaiNguoiDungVoucher;
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

//    public void themVoucherChoNguoiDung(Long nguoiDungId, Long voucherId) {
//        // Kiểm tra xem người dùng và voucher có tồn tại không
//        NguoiDung nguoiDung = nguoiDungRepo.findById(nguoiDungId).orElse(null);
//        Voucher voucher = voucherRepo.findById(voucherId).orElse(null);
//
//
//        if (nguoiDung != null && voucher != null ) {
//            // Tạo mối quan hệ giữa người dùng và voucher
//            NguoiDungVoucher nguoiDungVoucher = new NguoiDungVoucher();
//            nguoiDungVoucher.setNguoiDung(nguoiDung);
//            nguoiDungVoucher.setVoucher(voucher);
//            nguoiDungVoucher.setTrangThai(TrangThaiNguoiDungVoucher.SUDUNG);
//            nguoiDungVoucher.setHanSuDung(voucher.getNgayKetThuc());
//            nguoiDungVoucher.setLoaiGiam(voucher.getLoaiGiam());
//            nguoiDungVoucher.setGiaTriGiam(voucher.getGiaTriGiam());
//            // Thêm voucher cho người dùng
//            nguoiDungVoucherRepo.save(nguoiDungVoucher);
//
//            // Giảm số lượng của voucher đi 1 nếu soLuong không phải là null
//            Integer soLuong = voucher.getSoLuong();
//
//            if (soLuong != null && soLuong > 0) {
//                voucher.setSoLuong(soLuong - 1);
//                voucherRepo.save(voucher);
//            System.out.println("Updated voucher quantity: " + voucher.getSoLuong());
//
//            }
////            else {
////                // Xử lý trường hợp số lượng voucher không hợp lệ
////                // Có thể ném một exception hoặc thực hiện các xử lý khác tùy thuộc vào yêu cầu
////            }
//        } else {
//            // Xử lý trường hợp người dùng hoặc voucher không tồn tại
//            // Có thể ném một exception hoặc thực hiện các xử lý khác tùy thuộc vào yêu cầu
//        }
//    }



    public void themVoucherChoNguoiDung(Long nguoiDungId, Long voucherId) {
        // Kiểm tra xem người dùng và voucher có tồn tại không
        NguoiDung nguoiDung = nguoiDungRepo.findById(nguoiDungId).orElse(null);
        Voucher voucher = voucherRepo.findById(voucherId).orElse(null);

        if (nguoiDung != null && voucher != null) {
            // Log the current quantity before decrementing
            System.out.println("Current voucher quantity: " + voucher.getSoLuong());

            // Giảm số lượng của voucher đi 1 nếu soLuong không phải là null và lớn hơn 0
            Integer soLuong = voucher.getSoLuong();
            if (soLuong != null && soLuong > 0) {
                voucher.setSoLuong(voucher.getSoLuong() - 1);

                // Log the updated quantity before saving
                System.out.println("Updated voucher quantity: " + voucher.getSoLuong());

                voucherRepo.save(voucher); // Save the updated voucher after decrementing the quantity

                // Tạo mối quan hệ giữa người dùng và voucher
                NguoiDungVoucher nguoiDungVoucher = new NguoiDungVoucher();
                nguoiDungVoucher.setNguoiDung(nguoiDung);
                nguoiDungVoucher.setVoucher(voucher);
                nguoiDungVoucher.setTrangThai(TrangThaiNguoiDungVoucher.SUDUNG);

                // Set other properties from the voucher to nguoiDungVoucher
            nguoiDungVoucher.setHanSuDung(voucher.getNgayKetThuc());
            nguoiDungVoucher.setLoaiGiam(voucher.getLoaiGiam());
            nguoiDungVoucher.setGiaTriGiam(voucher.getGiaTriGiam());

                // Thêm voucher cho người dùng
                nguoiDungVoucherRepo.save(nguoiDungVoucher);
            } else {
                // Xử lý trường hợp số lượng voucher không hợp lệ
                // Có thể ném một exception hoặc thực hiện các xử lý khác tùy thuộc vào yêu cầu
                System.out.println("Số lượng voucher không hợp lệ");
                // Throw an exception or handle the invalid quantity in a way that fits your requirements
            }
        } else {
            // Xử lý trường hợp người dùng hoặc voucher không tồn tại
            // Có thể ném một exception hoặc thực hiện các xử lý khác tùy thuộc vào yêu cầu
            System.out.println("Người dùng hoặc voucher không tồn tại");
            // Throw an exception or handle the non-existent user or voucher in a way that fits your requirements
        }
    }



}
