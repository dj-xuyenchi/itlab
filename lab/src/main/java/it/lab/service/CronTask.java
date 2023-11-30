package it.lab.service;

import it.lab.common.Email;
import it.lab.common.Template;
import it.lab.iservice.Cron;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;

@Service
public class CronTask implements Cron {
    //"do.quanganh99zz@gmail.com", "hnfoowwjgkagrbxu", "smtp.gmail.com", "587"
    Email email = new Email();
//
//    @Scheduled(cron = "15 * * * * ?")
//    public void guiBaoCaoHangNgay() {
//       Excel.taoBaoCaoNgay();
//
//        email.sendContentAndMultipartToVer2("anhdqph19418@fpt.edu.vn", "ss","ss", Arrays.stream(new String[]{"/Users/quanganhdo/Documents/it/Template.xlsx"}).toList());
//    }

    @Override
    public void guiBaoCaoHangTuan() {

    }

    @Override
    public void guiBaoCaoHangThang() {

    }
}
