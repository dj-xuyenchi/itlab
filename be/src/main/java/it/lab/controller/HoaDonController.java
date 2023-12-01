package it.lab.controller;

import it.lab.iservice.IHoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/admin")
public class HoaDonController {
    @Autowired
    private IHoaDonService _hoaDonService;

    @RequestMapping(value = "/layhoadoncho", method = RequestMethod.GET)
    public ResponseEntity<?> layHoaDonCho() {
        return ResponseEntity.ok(_hoaDonService.layHetHoaDonCho());
    }

    @RequestMapping(value = "/xacnhanhoadon", method = RequestMethod.POST)
    public ResponseEntity<?> xacNhanHoaDon(@RequestBody Long[] hoaDonId) {
        return ResponseEntity.ok(_hoaDonService.xacNhanHoaDon(hoaDonId));
    }

    @RequestMapping(value = "/layhoadonchogiao", method = RequestMethod.GET)
    public ResponseEntity<?> layHoaDonChoGiao() {
        return ResponseEntity.ok(_hoaDonService.layHetHoaDonChoGiao());
    }

    @RequestMapping(value = "/layhoadonhuy", method = RequestMethod.GET)
    public ResponseEntity<?> layHoaDonHuy() {
        return ResponseEntity.ok(_hoaDonService.layHetHoaDonHuy());
    }

    @RequestMapping(value = "/huyhoadon", method = RequestMethod.POST)
    public ResponseEntity<?> huyHoaDon(@RequestBody Long[] hoaDonId) {
        return ResponseEntity.ok(_hoaDonService.huyHoaDon(hoaDonId));
    }

    @RequestMapping(value = "/layhoadonbyid", method = RequestMethod.GET)
    public ResponseEntity<?> layHoaDonById(@RequestParam Long hoaDonId) {
        return ResponseEntity.ok(_hoaDonService.layHoaDonById(hoaDonId));
    }
}
