package it.lab.iservice;

import it.lab.dto.GioHangDTO;
import it.lab.dto.HoaDonChiTietDTO;
import it.lab.dto.SanPhamChiTietDTO;
import it.lab.modelcustom.respon.HoaDonChoTaiCuaHang;

import java.util.List;

public interface IMuaTaiQuayService {
    public List<HoaDonChoTaiCuaHang> layDanhSachTaiCuaHang();

    public String taoMoiHoaDon(Long nhanVienId);

    public List<SanPhamChiTietDTO> layHetChiTiet();

    public List<HoaDonChiTietDTO> gioHangCuaHoaDon(Long hoaDonId);

    public List<HoaDonChiTietDTO> themSanPhamVaoHoaDon(Long hoaDonId, Long sanPhamId);
}
