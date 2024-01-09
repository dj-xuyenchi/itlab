package it.lab.iservice;

import it.lab.dto.NguoiDungVoucherDTO;
import it.lab.dto.VoucherDTO;
import it.lab.modelcustom.respon.NguoiDungVoucherSoLuong;

import java.util.List;

public interface IVoucherService {
    public void themVoucher(VoucherDTO voucher);

    public void suaVoucher(VoucherDTO voucher);

    public void xoaVoucher(Long voucherId);

    public List<VoucherDTO> layVoucher();

    public List<NguoiDungVoucherSoLuong> layHetVoucherNguoiDung(Long voucherId);
}
