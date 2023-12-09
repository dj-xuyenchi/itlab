package it.lab.controller;

import it.lab.dto.NguoiDungDTO;
import it.lab.entity.NguoiDung;
import it.lab.iservice.INguoiDungService;
import it.lab.iservice.IRankKhachHang;
import it.lab.modelcustom.request.DoiMatKhau;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/nguoi-dung")
public class NguoiDungController {
    @Autowired
    private INguoiDungService _nguoiDungService;

    @Autowired
    private IRankKhachHang _rankKhachHangService;

    @RequestMapping(value = "/laynguoidung", method = RequestMethod.GET)
    public ResponseEntity<?> layNguoiDung() {
        return ResponseEntity.ok(_nguoiDungService.layHetNguoiDung());
    }

    @RequestMapping(value = "/laythongtinnguoidung", method = RequestMethod.GET)
    public ResponseEntity<?> layThongTinNguoiDung(
            @RequestParam Long nguoiDungId
    ) {
        return ResponseEntity.ok(_nguoiDungService.layThongTinTaiKhoanById(nguoiDungId));
    }

    @RequestMapping(value = "/capnhatnguoidung", method = RequestMethod.POST)
    public ResponseEntity<?> capNhatNguoiDung(
            @RequestBody NguoiDungDTO nguoiDungDTO
    ) {
        return ResponseEntity.ok(_nguoiDungService.capNhatNguoiDung(nguoiDungDTO));
    }
    @RequestMapping(value = "/doimatkhau", method = RequestMethod.POST)
    public ResponseEntity<?> doiMatKhau(
            @RequestBody DoiMatKhau matKhau
    ) {
        return ResponseEntity.ok(_nguoiDungService.doiMatKhau(matKhau));
    }

    @RequestMapping(value = "/xoanguoidung", method = RequestMethod.GET)
    public ResponseEntity<?> xoaNguoiDung(@RequestParam Long nguoiDungId) {
        return ResponseEntity.ok(_nguoiDungService.xoaNguoiDung(nguoiDungId));
    }

    @RequestMapping(value = "/themnguoidung", method = RequestMethod.POST)
    public ResponseEntity<?> themNguoiDung(@RequestBody NguoiDung nguoiDung) {
        return ResponseEntity.ok(_nguoiDungService.themNguoiDung(nguoiDung));
    }

    @RequestMapping(value = "/layrankkhachhang", method = RequestMethod.GET)
    public ResponseEntity<?> layRankKhachHang() {
        return ResponseEntity.ok(_rankKhachHangService.layHetRankKhachHang());
    }

}
