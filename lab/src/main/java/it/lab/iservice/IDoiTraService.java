package it.lab.iservice;

import it.lab.entity.HoaDon;
import it.lab.entity.HoaDonChiTiet;

import java.util.List;

public interface IDoiTraService {
    public List<HoaDonChiTiet> layHoaDonChiTietCuaHoaDon(Long hoaDonId);
}
