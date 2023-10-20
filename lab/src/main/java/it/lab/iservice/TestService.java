package it.lab.iservice;

import it.lab.entity.NguoiDung;
import it.lab.modelcustom.NguoiDungCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TestService {
    List<NguoiDungCustom> layNguoiDung();
    Page<NguoiDung> getPage(Pageable pageable);

    public void save(NguoiDung nguoiDung);
    public void deleteById(long id);
    public void update(NguoiDung nguoiDung);
}
