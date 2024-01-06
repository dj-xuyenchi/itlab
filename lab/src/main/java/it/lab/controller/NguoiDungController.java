package it.lab.controller;

import com.google.gson.Gson;
import it.lab.common.ResponObject;
import it.lab.dto.DiaChiDTO;
import it.lab.entity.DiaChi;
import it.lab.enums.APIStatus;
import it.lab.iservice.INguoiDungService;
import it.lab.iservice.IRankKhachHang;
import it.lab.modelcustom.request.DiaChiRequest;
import it.lab.modelcustom.request.DoiMatKhau;
import it.lab.modelcustom.request.NguoiDungRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<?> suaNguoiDung(@RequestPart("anhDaiDien") Optional<MultipartFile> data, @RequestPart("data") String nguoiDung) throws IOException {
        Gson gson = new Gson();
        return ResponseEntity.ok(_nguoiDungService.capNhatNguoiDung(gson.fromJson(nguoiDung, NguoiDungRequest.class), data.isPresent() ? data.get() : null));
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
    public ResponseEntity<?> themNguoiDung(@RequestPart("anhDaiDien") MultipartFile data, @RequestPart("data") String nguoiDung) throws IOException {
        Gson gson = new Gson();
        return ResponseEntity.ok(_nguoiDungService.themNguoiDung(gson.fromJson(nguoiDung, NguoiDungRequest.class), data));
    }

    @RequestMapping(value = "/layrankkhachhang", method = RequestMethod.GET)
    public ResponseEntity<?> layRankKhachHang() {
        return ResponseEntity.ok(_rankKhachHangService.layHetRankKhachHang());
    }

    @RequestMapping(value = "/laydiachinguoidung", method = RequestMethod.GET)
    public ResponseEntity<?> layDiaChi(@RequestParam Long nguoiDungId) {
        return ResponseEntity.ok(_nguoiDungService.layDiaChiNguoiDung(nguoiDungId));
    }

    @RequestMapping(value = "/capnhatdiachimacdinh", method = RequestMethod.POST)
    public ResponseEntity<?> capNhatDiaChiMacDinh(
            @RequestParam Long nguoiDungId,
            @RequestParam Long diaChiId) {
        try {
            ResponObject<String, APIStatus> response = _nguoiDungService.capNhatDiaChiMacDinh(nguoiDungId, diaChiId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Có lỗi xảy ra: " + e.getMessage());
        }
    }

    @RequestMapping(value = "/themdiachi", method = RequestMethod.POST)
    public ResponseEntity<?> themDiaChi(@RequestBody DiaChiRequest diaChiRequest) {
        try {
            ResponObject<String, APIStatus> response = _nguoiDungService.themDiaChi(diaChiRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Có lỗi xảy ra: " + e.getMessage());
        }
    }

    @RequestMapping(value = "/capnhatdiachi", method = RequestMethod.POST)
    public ResponseEntity<?> capNhatDiaChi(@RequestBody DiaChiRequest diaChiRequest) {
        try {
            ResponObject<String, APIStatus> response = _nguoiDungService.capNhatDiaChi(diaChiRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ResponObject<String, APIStatus>(null, APIStatus.THATBAI, "Có lỗi xảy ra: " + e.getMessage()));
        }
    }
}
