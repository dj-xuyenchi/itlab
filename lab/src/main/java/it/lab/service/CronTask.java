package it.lab.service;

import it.lab.entity.SanPham;
import it.lab.entity.SanPhamSuKien;
import it.lab.entity.SuKienGiamGia;
import it.lab.enums.TrangThaiSanPhamSuKien;
import it.lab.enums.TrangThaiSuKienGiamGia;
import it.lab.iservice.Cron;
import it.lab.repository.SanPhamSuKienRepo;
import it.lab.repository.SuKienGiamGiaRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CronTask implements Cron {
    //"do.quanganh99zz@gmail.com", "hnfoowwjgkagrbxu", "smtp.gmail.com", "587"
    //   Email email = new Email();
//
    @Autowired
    private SuKienGiamGiaRepo _suKienGiamGiaRepo;
    @Autowired
    private SanPhamSuKienRepo sanPhamSuKienRepo;

    @Scheduled(cron = "15 * * * * ?")
    public void guiBaoCaoHangNgay() {
        //   doiTrangThaiSuKien();
//       Excel.taoBaoCaoNgay();
//
//        email.sendContentAndMultipartToVer2("anhdqph19418@fpt.edu.vn", "ss","ss", Arrays.stream(new String[]{"/Users/quanganhdo/Documents/it/Template.xlsx"}).toList());
    }

    private void doiTrangThaiSuKien() {
        var suKien = _suKienGiamGiaRepo.findAll().stream().filter(x -> x.getTrangThai() == TrangThaiSuKienGiamGia.CHUADIENRA).toList();
        for (var item : suKien) {
            if (item.getNgayBatDau().isAfter(LocalDateTime.now())) {
                System.out.println("đã kích hoạt sự kiện" + item.getTenSuKien());
                item.setTrangThai(TrangThaiSuKienGiamGia.HOATDONG);
                _suKienGiamGiaRepo.save(item);
            }
        }
        var suKien2 = _suKienGiamGiaRepo.findAll().stream().filter(x -> x.getTrangThai() == TrangThaiSuKienGiamGia.HOATDONG).toList();
        for (var item : suKien) {
            if (item.getNgayKetThuc().isAfter(LocalDateTime.now())) {
                System.out.println("đã ngừng sự kiện" + item.getTenSuKien());
                item.setTrangThai(TrangThaiSuKienGiamGia.DANGUNG);
                _suKienGiamGiaRepo.save(item);
            }
        }
    }

    @Scheduled(cron = "0 0 0 * * *")
    private void updateTrangThaiSuKienAuTo() {
        List<SuKienGiamGia> suKienGiamGiaList = _suKienGiamGiaRepo.findAll();
        for (SuKienGiamGia suKienGiamGia : suKienGiamGiaList) {
            if (suKienGiamGia.getTrangThai() == TrangThaiSuKienGiamGia.HOATDONG || suKienGiamGia.getTrangThai() == TrangThaiSuKienGiamGia.CHUADIENRA) {
                if (suKienGiamGia.getNgayBatDau().isBefore(LocalDateTime.now()) || suKienGiamGia.getNgayBatDau().isEqual(LocalDateTime.now())) {
                    suKienGiamGia.setTrangThai(TrangThaiSuKienGiamGia.HOATDONG);
                    _suKienGiamGiaRepo.save(suKienGiamGia);
                }
                if (suKienGiamGia.getNgayKetThuc().isBefore(LocalDateTime.now())) {
                    suKienGiamGia.setTrangThai(TrangThaiSuKienGiamGia.DANGUNG);
                    _suKienGiamGiaRepo.save(suKienGiamGia);
                }
            }
        }
    }
    @Scheduled(cron = "0 0 1 * * *")
    public void updateTrangThaiSPSuKienAuTo(){
        List<SanPhamSuKien> sanPhamSuKienList=sanPhamSuKienRepo.findAll();
        for(SanPhamSuKien sanPhamSuKien:sanPhamSuKienList){
            if(sanPhamSuKien.getTrangThai()== TrangThaiSanPhamSuKien.CHAY_SU_KIEN){
                if(sanPhamSuKien.getSuKienGiamGia().getTrangThai() == TrangThaiSuKienGiamGia.DANGUNG){
                    sanPhamSuKien.setTrangThai(TrangThaiSanPhamSuKien.NGUNG_SU_KIEN);
                    sanPhamSuKienRepo.save(sanPhamSuKien);
                }
            }
        }
    }

    @Override
    public void guiBaoCaoHangTuan() {

    }

    @Override
    public void guiBaoCaoHangThang() {

    }
}
