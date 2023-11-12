package it.lab.controller;


import it.lab.repository.ThongKeNguoiDungRepository;
import it.lab.repository.ThongKeRankRepository;
import it.lab.repository.ThongKeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/api/thong-ke")
public class ThongKeController {

    @Autowired
    private ThongKeRankRepository repositoryRank;

    @Autowired
    private ThongKeRepository repositoryThongKe;

    @Autowired
    private ThongKeNguoiDungRepository repositoryNguoiDung;

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
        return repositoryThongKe.taiKhoanDoanhThuThap(pageRequest);
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


    //Thong ke tai khoan moi trong 1 thang
    @GetMapping("/tai-khoan-moi")
    public List<Object[]> thongKeTaiKhoanMoiTrongThang() {
        LocalDate oneMonthAgo = LocalDate.now().minusMonths(1); // Lấy thời điểm hiện tại và trừ đi 1 tháng
        List<Object[]> ketQua = repositoryNguoiDung.countTaiKhoanMoiTrongThang(oneMonthAgo);
        return ketQua;
    }

    //Thong ke doanh thu thang
    @GetMapping("/tong-doanh-thu-trong-thang")
    public BigDecimal tinhTongDoanhThuTrongThang(@RequestParam("selectedDate") Date selectedDate) {
        return repositoryThongKe.tinhTongDoanhThuTrongThang(selectedDate);
    }

    //Thong ke doanh thu 1 nam
    @GetMapping("/tong-doanh-thu-trong-nam")
    public BigDecimal tinhTongDoanhThuTrongNam(@RequestParam("selectedDate") Date selectedDate) {
        return repositoryThongKe.tinhTongDoanhThuTrongNam(selectedDate);
    }

    //thong ke doanh thu theo khoang ngay

    @GetMapping("/tong-khoang-ngay")
    public BigDecimal tinhTongDoanhThuTrongKhoangNgay(
            @RequestParam(value = "selectedDateStart", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") String selectedDateStart,
            @RequestParam(value = "selectedDateEnd", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") String selectedDateEnd) {

        // Loại bỏ khoảng trắng dư thừa
        selectedDateStart = selectedDateStart.trim();
        selectedDateEnd = selectedDateEnd.trim();

        LocalDate startDate = LocalDate.parse(selectedDateStart, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        LocalDate endDate = LocalDate.parse(selectedDateEnd, DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        return repositoryThongKe.tinhTongDoanhThuTrongKhoangNgay(startDate, endDate);
    }

// thong ke 12 thang bang bieu do doanh thu tung thang-yyyy
@GetMapping("/bieu-do")
public List<BigDecimal> getBieuDoData() {
    int currentYear = YearMonth.now().getYear();
    List<BigDecimal> doanhThuTheoThang = new ArrayList<>();


    for (int month = 1; month <= 12; month++) {
        BigDecimal doanhThuThang = repositoryThongKe.tinhTongDoanhThuTrongThangChar(currentYear, month);
        doanhThuTheoThang.add(doanhThuThang);

    }

    return doanhThuTheoThang;
}





}
