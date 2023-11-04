package it.lab.controller;


import it.lab.repository.ThongKeRankRepository;
import it.lab.repository.ThongKeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/thong-ke")
public class ThongKeController {

    @Autowired
    private ThongKeRankRepository repositoryRank;

    @Autowired
    private ThongKeRepository repositoryThongKe;

    //thong ke tai khoan c rank
    @GetMapping("/rank")
    public List<Object[]> getTotalRevenueByUser() {
        return repositoryRank.findTotalRevenueByUser();
    }



    @GetMapping("/tai-khoan-doanh-thu-cao")
    public List<Object[]> getTop5DoanhThuCao() {
        PageRequest pageRequest = PageRequest.of(0, 5); // Get the first 5 results
        return repositoryThongKe.taiKhoanDoanhThuCaoNhat(pageRequest);
    }

    @GetMapping("/tai-khoan-doanh-thu-thap")
    public List<Object[]> getTop5DoanhThuThap() {
        PageRequest pageRequest = PageRequest.of(0, 5); // Get the first 5 results
        return repositoryThongKe.taiKhoanDoanhThuCaoNhat(pageRequest);
    }



    //Thong ke thanh pho mua nhieu
    @GetMapping("/thanh-pho-mua-nhieu-nhat")
    public List<Object[]> getTopThanhPhoMuaNhieu() {
        return repositoryThongKe.ThongKeThanhPhoMuaNhieu();
    }


    //Thông kê tổng tien trong ngay
    @GetMapping("/doanh-thu-ngay")
    public BigDecimal tinhTongDoanhThuTrongNgay(@RequestParam("selectedDate")
                                                @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate selectedDate) {
        return repositoryThongKe.tinhTongDoanhThuTrongNgay(selectedDate);
    }



}
