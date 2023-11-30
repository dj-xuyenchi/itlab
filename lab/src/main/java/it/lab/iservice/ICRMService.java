package it.lab.iservice;

import it.lab.dto.SanPhamYeuThichDTO;
import it.lab.entity.SanPhamYeuThich;
import it.lab.entity.SuKienGiamGia;
import it.lab.enums.APIStatus;
import it.lab.modelcustom.respon.DoanhThu;

import java.util.List;

public interface ICRMService {
    public List<SanPhamYeuThichDTO> getSanPhamYeuThichUser(Long userId);

    public List<DoanhThu> doanhThuTheo12Thang();

    public APIStatus themSuKien(SuKienGiamGia suKienGiamGia);
}
