package it.lab.iservice;

import it.lab.common.Page;
import it.lab.common.ResponObject;
import it.lab.dto.HoaDonDTO;
import it.lab.enums.APIStatus;
import it.lab.enums.XacNhanHoaDonEnum;
import it.lab.modelcustom.respon.*;

import java.util.List;

public interface IHoaDonService {
    public Page<HoaDonCho> layHetHoaDonCho();

    public Page<HoaDonChoGiao> layHetHoaDonChoGiao();

    public Page<HoaDonHuy> layHetHoaDonHuy();

    public Page<HoaDonDangGiao> layHetHoaDonDangGiao();

    public Page<HoaDonHoanThanh> layHetHoaDonHoanThanh();

    public ResponObject<List<String>, XacNhanHoaDonEnum> xacNhanHoaDon(Long[] hoaDonId);

    public ResponObject<List<String>, XacNhanHoaDonEnum> chuyenSangDangGiao(Long[] hoaDonId);

    public ResponObject<List<String>, XacNhanHoaDonEnum> chuyenSangHoanThanh(Long[] hoaDonId);

    public ResponObject<List<String>, XacNhanHoaDonEnum> huyHoaDon(Long[] hoaDonId);

    public ResponObject<HoaDonDTO, APIStatus> layHoaDonById(Long hoaDonId);

}
