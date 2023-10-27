package it.lab.iservice;

import it.lab.common.Page;
import it.lab.common.ResponObject;
import it.lab.dto.SanPhamDTO;
import it.lab.entity.SanPham;
import it.lab.enums.APIStatus;
import it.lab.modelcustom.respon.FullThuocTinh;
import it.lab.modelcustom.respon.SanPhamChiTiet;

import java.util.List;

public interface ISanPhamService {
    public Page<SanPhamDTO> phanTrangSanPhamTrangChu(Integer page, Integer pageSize, Long chatLieuId, Long thietKeId, Long thuongHieuId, Long mauSacId, Long loaiSanPhamId, Long kichThuocId);

    public SanPhamChiTiet chiTietSanPham(Long sanPhamId);

    public FullThuocTinh layHetThuocTinh();

    public ResponObject<String, APIStatus> themSanPham(SanPham sanPham);
}
