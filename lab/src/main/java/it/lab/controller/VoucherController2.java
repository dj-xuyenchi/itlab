package it.lab.controller;

import com.google.gson.*;
import it.lab.dto.VoucherDTO;
import it.lab.entity.Voucher;
import it.lab.iservice.IVoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.time.LocalDateTime;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/voucher2")
public class VoucherController2 {
    @Autowired
    private IVoucherService _voucherService;
    Gson gson = new GsonBuilder().registerTypeAdapter(LocalDateTime.class, new JsonDeserializer<LocalDateTime>() {
        @Override
        public LocalDateTime deserialize(JsonElement json, Type type, JsonDeserializationContext jsonDeserializationContext) throws JsonParseException {
            return LocalDateTime.parse(json.getAsJsonPrimitive().getAsString());
        }
    }).create();
    @GetMapping(value = "layhetvoucher")
    public ResponseEntity<?> layHetVoucher() {
        return ResponseEntity.ok(_voucherService.layVoucher());
    }

    @PostMapping(value = "themvoucher")
    public ResponseEntity<?> themVoucher(@RequestBody String voucher) {
        _voucherService.themVoucher(gson.fromJson(voucher,VoucherDTO.class));
        return ResponseEntity.ok("");
    }

    @PostMapping(value = "suavoucher")
    public ResponseEntity<?> suaVoucher(@RequestBody VoucherDTO voucher) {
        _voucherService.suaVoucher(voucher);
        return ResponseEntity.ok("");
    }

    @GetMapping(value = "xoavoucher")
    public ResponseEntity<?> suaVoucher(@RequestParam Long voucherId) {
        _voucherService.xoaVoucher(voucherId);
        return ResponseEntity.ok("");
    }
}
