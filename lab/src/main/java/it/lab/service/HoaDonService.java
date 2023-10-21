package it.lab.service;

import it.lab.entity.HoaDon;
import it.lab.iservice.IHoaDonService;
import it.lab.repository.HoaDonRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HoaDonService implements IHoaDonService {
    @Autowired
    private HoaDonRepo hoaDonRepo;

    @Override
    public Page<HoaDon> getPage(Pageable pageable) {
        return hoaDonRepo.findAll(pageable);
    }

    @Override
    public List<HoaDon> getAll() {
        return hoaDonRepo.findAll();
    }

    @Override
    public HoaDon save(HoaDon hoaDon) {
        return hoaDonRepo.save(hoaDon);
    }

    @Override
    public void deleteById(long id) {
        hoaDonRepo.deleteById(id);
    }

    @Override
    public HoaDon update(HoaDon hoaDon, Long id) {
        hoaDon=hoaDonRepo.findById(id).orElse(null);
        hoaDonRepo.save(hoaDon);
        return hoaDon;
    }

    @Override
    public HoaDon findById(long id) {
        return null;
    }
}
