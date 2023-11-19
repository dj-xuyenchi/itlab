package it.lab.repository;

import it.lab.entity.NguoiDung;
import it.lab.entity.QuyenNguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuyenNguoiDungRepo extends JpaRepository<QuyenNguoiDung, Long> {
    public List<QuyenNguoiDung> findAllByNguoiDungEquals(NguoiDung nguoiDung);

//    thông kê có bao nhiêu nhân viên
// Thống kê có bao nhiêu nhân viên với quyenid là '2'
@Query("SELECT COUNT(qnd) FROM QuyenNguoiDung qnd WHERE qnd.quyen.id = 2")
Long tongSoNhanVien();
}
