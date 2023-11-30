package it.lab.iservice;

import it.lab.common.ResponObject;
import it.lab.entity.Voucher;
import it.lab.enums.APIStatus;

import java.util.List;

public interface iVoucherService {
    List<Voucher> searchByName(String tenVoucher);

    public ResponObject<String, APIStatus> themVoucher(Voucher voucher);


}
