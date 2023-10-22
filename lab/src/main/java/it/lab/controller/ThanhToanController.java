package it.lab.controller;

import it.lab.iservice.IThanhToan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/thanhtoan")
public class ThanhToanController {
    @Autowired
    private IThanhToan _thanhToanService;

    @RequestMapping(value = "/thanhtoan", method = RequestMethod.GET)
    public ResponseEntity<?> thanhToan(
            @RequestParam Long nguoiDungId) {
        return ResponseEntity.ok(_thanhToanService.layDuLieuThanhToan(nguoiDungId));
    }
}
