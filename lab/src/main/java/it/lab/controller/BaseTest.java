package it.lab.controller;

import it.lab.iservice.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(value = "*", allowedHeaders = "*")
public class BaseTest {
    @Autowired
    private TestService _nguoiDungService;

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public ResponseEntity<?> layDuLieu() {
        return ResponseEntity.ok(_nguoiDungService.layNguoiDung());
    }
     @RequestMapping(value = "/test2", method = RequestMethod.GET)
    public ResponseEntity<?> layDuLieu2() {
        return ResponseEntity.ok("hihi anh quang anh đệp trai vãi lol");
    }
}
