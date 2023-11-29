package it.lab.repository;

import it.lab.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoucherRepo extends JpaRepository<Voucher, Long> {
    @Query("SELECT v FROM Voucher v WHERE LOWER(v.tenVoucher) LIKE LOWER(CONCAT('%', :tenVoucher, '%'))")
    List<Voucher> searchByName(@Param("tenVoucher") String tenVoucher);
}

