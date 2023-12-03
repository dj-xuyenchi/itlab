package it.lab.repository;

import it.lab.entity.Voucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoucherRepo extends JpaRepository<Voucher, Long> {

    Voucher findVoucherById(Long id);


    @Query("SELECT ctsp FROM Voucher ctsp WHERE ctsp.tenVoucher LIKE %:tenVoucher%")
    List<Voucher> searchByTen(@Param("tenVoucher") String keyword);

    @Query("SELECT ctsp FROM Voucher ctsp WHERE ctsp.tenVoucher LIKE %:tenVoucher%")
    Page<Voucher> searchByTenPage(@Param("tenVoucher") String keyword, Pageable pageable);
}
