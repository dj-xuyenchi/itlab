package it.lab.repository;

import it.lab.entity.NguoiDung;
import it.lab.entity.NguoiDungVoucher;
import it.lab.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NguoiDungVoucherRepo extends JpaRepository<NguoiDungVoucher, Long> {

    NguoiDungVoucher findNguoiDungVoucherById(Long id);
}
