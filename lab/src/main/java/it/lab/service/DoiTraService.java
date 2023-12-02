package it.lab.service;

import it.lab.entity.HoaDon;
import it.lab.entity.HoaDonChiTiet;
import it.lab.iservice.IDoiTraService;
import it.lab.repository.HoaDonChiTietRepo;
import it.lab.repository.HoaDonRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoiTraService implements IDoiTraService {
    @Autowired
    private HoaDonChiTietRepo _hoaDonChiTietRepo;
    @Autowired
    private HoaDonRepo _hoaDonRepo;

    @Override
    public List<HoaDonChiTiet> layHoaDonChiTietCuaHoaDon(Long hoaDonId) {
        HoaDon hoaDon = _hoaDonRepo.findById(hoaDonId).get();
        return _hoaDonChiTietRepo.findHoaDonChiTietsByHoaDon(hoaDon);
    }
}
