package it.lab.controller;

import it.lab.iservice.IDoiTraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class DoiTraController {
    @Autowired
    private IDoiTraService _doiTraService;

    @RequestMapping(value = "/laydanhsachchitietdoitracuahoadon", method = RequestMethod.GET)
    public ResponseEntity<?> layChiTiet(Long hoaDonId) {
        return ResponseEntity.ok(_doiTraService.layHoaDonChiTietCuaHoaDon(hoaDonId));
    }
}
