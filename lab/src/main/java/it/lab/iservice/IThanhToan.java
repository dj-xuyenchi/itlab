package it.lab.iservice;

import it.lab.common.ResponObject;
import it.lab.enums.APIStatus;
import it.lab.modelcustom.respon.CheckOut;

public interface IThanhToan {
    public ResponObject<CheckOut, APIStatus> layDuLieuThanhToan(Long nguoiDungId);
}
