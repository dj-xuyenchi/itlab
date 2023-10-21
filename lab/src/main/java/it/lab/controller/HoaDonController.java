package it.lab.controller;

import it.lab.entity.HoaDon;
import it.lab.entity.NguoiDung;
import it.lab.iservice.IHoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hoa-don")
public class HoaDonController {
    @Autowired
    private IHoaDonService hoaDonService;

    @GetMapping("/get-all")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(hoaDonService.getAll());
    }

    @GetMapping("/get-page")
    public ResponseEntity<?> getPage(@RequestParam(defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 20);
        return ResponseEntity.ok(hoaDonService.getPage(pageable));
    }
    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody HoaDon hoaDon) {
        return ResponseEntity.ok(hoaDonService.save(hoaDon));
    }
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable long id){
        hoaDonService.deleteById(id);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@RequestBody HoaDon hoaDon,@PathVariable(name = "id") Long id){
        hoaDonService.save(hoaDon);
        return ResponseEntity.ok(hoaDon);
    }
}
