package it.lab.iservice;

import it.lab.entity.HoaDon;
import it.lab.entity.NguoiDung;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;


public interface IHoaDonService {
    Page<HoaDon> getPage(Pageable pageable);
    List<HoaDon> getAll();

    public HoaDon save(HoaDon hoaDon);
    public void deleteById(long id);
    public HoaDon update(HoaDon hoaDon,Long id);
    public HoaDon findById(long id);
}
