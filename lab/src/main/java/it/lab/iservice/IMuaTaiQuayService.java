package it.lab.iservice;

import it.lab.modelcustom.respon.HoaDonChoTaiCuaHang;

import java.util.List;

public interface IMuaTaiQuayService {
    public List<HoaDonChoTaiCuaHang> layDanhSachTaiCuaHang();
    public String taoMoiHoaDon(Long nhanVienId);
}
