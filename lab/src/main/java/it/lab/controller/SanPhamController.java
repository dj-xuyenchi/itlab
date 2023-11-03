package it.lab.controller;

import com.google.gson.Gson;
import it.lab.entity.ChatLieu;
import it.lab.entity.SanPham;
import it.lab.iservice.ISanPhamService;
import it.lab.modelcustom.request.SanPhamRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/sanpham")
public class SanPhamController {
    @Autowired
    private ISanPhamService _sanPhamService;

    @RequestMapping(value = "/phantrangsanpham", method = RequestMethod.GET)
    public ResponseEntity<?> layDuLieuSanPhamYeuThich(
            Integer page,
            Integer pageSize,
            Optional<Long> chatLieuId,
            Optional<Long> thietKeId,
            Optional<Long> thuongHieuId,
            Optional<Long> mauSacId,
            Optional<Long> loaiSanPhamId,
            Optional<Long> kichThuocId) {
        return ResponseEntity.ok(_sanPhamService.phanTrangSanPhamTrangChu(
                page,
                pageSize,
                chatLieuId.orElse(null),
                thietKeId.orElse(null),
                thuongHieuId.orElse(null),
                mauSacId.orElse(null),
                loaiSanPhamId.orElse(null),
                kichThuocId.orElse(null))
        );
    }

    @RequestMapping(value = "/sanphamchitiet", method = RequestMethod.GET)
    public ResponseEntity<?> layDuLieuSanPhamYeuThich(
            @RequestParam Long sanPhamId) {
        return ResponseEntity.ok(_sanPhamService.chiTietSanPham(sanPhamId));
    }

    @RequestMapping(value = "/laythuoctinh", method = RequestMethod.GET)
    public ResponseEntity<?> layDuLieuThuocTinh() {
        return ResponseEntity.ok(_sanPhamService.layHetThuocTinh());
    }

    @RequestMapping(value = "/laychatlieu", method = RequestMethod.GET)
    public ResponseEntity<?> layChatLieu() {
        return ResponseEntity.ok(_sanPhamService.layHetChatLieu());
    }

    @RequestMapping(value = "/themchatlieu", method = RequestMethod.POST)
    public ResponseEntity<?> themChatLieu(@RequestBody ChatLieu chatLieu) {
        return ResponseEntity.ok(_sanPhamService.themChatLieu(chatLieu));
    }

    @RequestMapping(value = "/xoachatlieu", method = RequestMethod.GET)
    public ResponseEntity<?> xoaChatLieu(@RequestParam Long chatLieuId) {
        return ResponseEntity.ok(_sanPhamService.xoaChatLieu(chatLieuId));
    }

    @RequestMapping(value = "/suachatlieu", method = RequestMethod.POST)
    public ResponseEntity<?> suaChatLieu(@RequestBody ChatLieu chatLieu) {
        return ResponseEntity.ok(_sanPhamService.suaChatLieu(chatLieu));
    }

    @RequestMapping(value = "/laychatlieubyid", method = RequestMethod.GET)
    public ResponseEntity<?> laySanPhamById(@RequestParam Long chatLieuId) {
        return ResponseEntity.ok(_sanPhamService.layChatLieuById(chatLieuId));
    }

    @RequestMapping(value = "/themsanpham", method = RequestMethod.POST)
    public ResponseEntity<?> themSanPham(@RequestPart("file1") MultipartFile data1, @RequestPart("file2") MultipartFile data2, @RequestPart("data") String sanPham) throws IOException {
        Gson gson = new Gson();
        return ResponseEntity.ok(_sanPhamService.themSanPham(gson.fromJson(sanPham, SanPhamRequest.class), data1, data2));
    }
}
