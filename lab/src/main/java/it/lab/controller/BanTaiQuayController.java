package it.lab.controller;

import it.lab.iservice.IHoaDonService;
import it.lab.iservice.IMuaTaiQuayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class BanTaiQuayController {
    @Autowired
    private IMuaTaiQuayService _muaTaiQuay;

    @RequestMapping(value = "/layhoadontaiquay", method = RequestMethod.GET)
    public ResponseEntity<?> layHetHoaDonCho() {
        return ResponseEntity.ok(_muaTaiQuay.layDanhSachTaiCuaHang());
    }

    @RequestMapping(value = "/taohoadontaiquay", method = RequestMethod.GET)
    public ResponseEntity<?> taoHoaDon(@RequestParam Long nhanVienId) {
        return ResponseEntity.ok(_muaTaiQuay.taoMoiHoaDon(nhanVienId));
    }
}
