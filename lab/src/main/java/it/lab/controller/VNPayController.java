package it.lab.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/vnpay")
public class VNPayController {
    @RequestMapping(value = "/thanhtoan", method = RequestMethod.GET)
    public ResponseEntity<?> thanhToan() {
        return ResponseEntity.ok("ok");
    }
}
