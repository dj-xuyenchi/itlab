package it.lab.controller;

import it.lab.entity.NguoiDung;
import it.lab.service.NguoiDungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/nguoi-dung")
public class NguoiDungController {
    @Autowired
    NguoiDungService nguoiDungService;

    @GetMapping("/get-all")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(nguoiDungService.layNguoiDung());
    }

}
