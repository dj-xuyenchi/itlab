package it.lab.repository;

import it.lab.entity.NguoiDung;
import it.lab.entity.NguoiDungVoucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NguoiDungVoucherRepo extends JpaRepository<NguoiDungVoucher, Long> {

    @Query("SELECT b.id, b.email, b.maNguoiDung, STRING_AGG(c.tenVoucher, ',') " +
            "FROM NguoiDungVoucher  a " +
            "JOIN  a.nguoiDung b " +
            "JOIN a.voucher c " +
            "GROUP BY b.id, b.email, b.maNguoiDung")
    List<Object[]> getAllTang();



}
