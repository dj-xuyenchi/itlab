package it.lab.controller;

import it.lab.entity.NguoiDung;
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

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable long id){
        nguoiDungService.deleteById(id);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@RequestBody NguoiDung nguoiDung,@PathVariable Long id){
        nguoiDungService.update(nguoiDung,id);
        return ResponseEntity.ok(nguoiDung);

    }

}
