package it.lab.controller;

import it.lab.entity.NguoiDung;
import it.lab.repository.NguoiDungRepo;
import it.lab.service.NguoiDungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/nguoi-dung")
public class NguoiDungController {
    @Autowired
    NguoiDungService nguoiDungService;
    @Autowired
    NguoiDungRepo nguoiDungRepo;

    @GetMapping("/get-all")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(nguoiDungService.getAll());
    }

    @GetMapping("/get-page")
    public ResponseEntity<?> getPage(@RequestParam(defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 20);
        return ResponseEntity.ok(nguoiDungService.getPage(pageable));
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody NguoiDung nguoiDung) {
        return ResponseEntity.ok(nguoiDungService.save(nguoiDung));
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@RequestBody NguoiDung nguoiDung,@PathVariable(name = "id") Long id){
        return ResponseEntity.ok( nguoiDungService.update(nguoiDung));
    }
//    @PutMapping("/update/{id}")
//    public ResponseEntity<?> update(@RequestBody NguoiDung updatedNguoiDung, @PathVariable(name = "id") Long id) {
//        NguoiDung nguoiDung = nguoiDungService.findById(id);
//        if (nguoiDung != null) {
//           nguoiDung=updatedNguoiDung;
//            nguoiDungService.update(nguoiDung);
//            return ResponseEntity.ok(nguoiDung);
//        } else {
//            // Xử lý trường hợp người dùng không tồn tại
//            return ResponseEntity.notFound().build();
//        }
//    }
}
