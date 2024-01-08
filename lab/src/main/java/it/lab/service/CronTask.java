package it.lab.service;

import it.lab.enums.TrangThaiHoaDon;
import it.lab.enums.TrangThaiSuKienGiamGia;
import it.lab.iservice.Cron;
import it.lab.repository.HoaDonChiTietRepo;
import it.lab.repository.HoaDonRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CronTask implements Cron {
    //"do.quanganh99zz@gmail.com", "hnfoowwjgkagrbxu", "smtp.gmail.com", "587"
    //   Email email = new Email();
//

    @Autowired
    private HoaDonRepo _hoaDonRepo;
    @Autowired
    private HoaDonChiTietRepo _hoaDonChiTietRepo;
    @Scheduled(cron = "15 * * * * ?")
    public void guiBaoCaoHangNgay() {
        //   doiTrangThaiSuKien();
//       Excel.taoBaoCaoNgay();
//
//        email.sendContentAndMultipartToVer2("anhdqph19418@fpt.edu.vn", "ss","ss", Arrays.stream(new String[]{"/Users/quanganhdo/Documents/it/Template.xlsx"}).toList());
    }

    //  @Scheduled(cron = "0 0 3 * * ?")
    //  @Scheduled(cron = "15 * * * * ?")
    public void xoaHoaDonRac() {
        var hoaDonRac = _hoaDonRepo.findAllByTrangThaiEquals(TrangThaiHoaDon.CHOTHANHTOANBANKING);
        for(var item : hoaDonRac){
            var hoaDonChiTiet = _hoaDonChiTietRepo.findHoaDonChiTietsByHoaDon(item);
            _hoaDonChiTietRepo.deleteAll(hoaDonChiTiet);
        }
        _hoaDonRepo.deleteAll(hoaDonRac);
    }





    @Override
    public void guiBaoCaoHangTuan() {

    }

    @Override
    public void guiBaoCaoHangThang() {

    }
}
