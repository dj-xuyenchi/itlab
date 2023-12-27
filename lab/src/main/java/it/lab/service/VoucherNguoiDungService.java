package it.lab.service;

import it.lab.entity.NguoiDung;
import it.lab.entity.NguoiDungVoucher;
import it.lab.entity.Voucher;
import it.lab.enums.TrangThaiNguoiDungVoucher;
import it.lab.enums.TrangThaiVoucher;
import it.lab.repository.NguoiDungRepo;
import it.lab.repository.NguoiDungVoucherRepo;
import it.lab.repository.VoucherRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class VoucherNguoiDungService {
    @Autowired
    private NguoiDungVoucherRepo nguoiDungVoucherRepo;
    @Autowired
    private VoucherRepo voucherRepo;
    @Autowired
    private NguoiDungRepo nguoiDungRepo;

    public void themVoucherChoTatCaNguoiDung(Long voucherId) {
        // Get the voucher with the specified ID
        Voucher voucher = voucherRepo.findById(voucherId).orElse(null);

        if (voucher != null) {
            // Log the current quantity before decrementing
            System.out.println("Current voucher quantity: " + voucher.getSoLuong());

            // Giảm số lượng của voucher đi 1 nếu soLuong không phải là null và lớn hơn 0
            Integer soLuong = voucher.getSoLuong();
            if (soLuong != null && soLuong > 0) {
                // Iterate through all users and apply the voucher
                List<NguoiDung> allUsers = nguoiDungRepo.getAllTangVoucher();
                for (NguoiDung nguoiDung : allUsers) {
                    try {
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
                    } catch (VoucherOutOfStockException e) {
                        // Handle the exception for a specific user (optional)
                        // You may want to log the error or take other actions for individual users
                    }
                }
            } else if (soLuong == 0) {
                voucher.setTrangThai(TrangThaiVoucher.NGUNG);
                voucherRepo.save(voucher);
                System.out.println("Voucher đã hết, chúc bạn may mắn lần sau !!! ");
                throw new VoucherOutOfStockException("Voucher đã hết, chúc bạn may mắn lần sau !!! ");
            }
        } else {
            System.out.println("Voucher không tồn tại");
        }
    }






    public void themVoucherChoNguoiDung(List<Long> nguoiDungIds, Long voucherId) {
        try {
            // Kiểm tra xem voucher có tồn tại không
            Voucher voucher = voucherRepo.findById(voucherId).orElse(null);

            if (voucher != null) {
                // Log the current quantity before decrementing
                System.out.println("Current voucher quantity: " + voucher.getSoLuong());

                // Giảm số lượng của voucher đi 1 nếu soLuong không phải là null và lớn hơn 0
                Integer soLuong = voucher.getSoLuong();
                if (soLuong != null && soLuong > 0) {
                    // Log the updated quantity before saving
                    System.out.println("Updated voucher quantity: " + voucher.getSoLuong());

                    voucherRepo.save(voucher); // Save the updated voucher after decrementing the quantity

                    // Tạo danh sách người dùng từ danh sách ID
                    List<NguoiDung> nguoiDungs = nguoiDungRepo.findAllById(nguoiDungIds);

                    // Thêm voucher cho từng người dùng
                    for (NguoiDung nguoiDung : nguoiDungs) {
                        NguoiDungVoucher nguoiDungVoucher = new NguoiDungVoucher();
                        nguoiDungVoucher.setNguoiDung(nguoiDung);
                        nguoiDungVoucher.setVoucher(voucher);
                        nguoiDungVoucher.setTrangThai(TrangThaiNguoiDungVoucher.SUDUNG);

                        // Set other properties from the voucher to nguoiDungVoucher
                        nguoiDungVoucher.setHanSuDung(voucher.getNgayKetThuc());
                        nguoiDungVoucher.setLoaiGiam(voucher.getLoaiGiam());
                        nguoiDungVoucher.setGiaTriGiam(voucher.getGiaTriGiam());

                        nguoiDungVoucherRepo.save(nguoiDungVoucher);
                    }
                } else if (soLuong == 0) {
                    voucher.setTrangThai(TrangThaiVoucher.NGUNG);
                    voucherRepo.save(voucher);
                    System.out.println("Voucher đã hết ,chúc bạn may mắn lần sau !!! ");
                    throw new VoucherOutOfStockException("Voucher đã hết, chúc bạn may mắn lần sau !!! ");
                }
            } else {
                System.out.println("Voucher không tồn tại");
            }
        } catch (Exception e) {
            System.out.println("Failed to add voucher for selected users: " + e.getMessage());
        }
    }


    public class VoucherOutOfStockException extends RuntimeException {
        public VoucherOutOfStockException(String message) {
            super(message);
        }
    }

}
