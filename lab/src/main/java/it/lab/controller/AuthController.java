package it.lab.controller;

import it.lab.entity.NguoiDung;
import it.lab.iservice.IAuthService;
import it.lab.iservice.ICRMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private IAuthService _authService;

    @RequestMapping(value = "/dangky", method = RequestMethod.POST)
    public ResponseEntity<?> themNguoiDung(@RequestBody NguoiDung nguoiDung) {
        return ResponseEntity.ok(_authService.dangKyTaiKhoan(nguoiDung));
    }
}
