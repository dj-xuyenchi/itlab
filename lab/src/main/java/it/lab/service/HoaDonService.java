package it.lab.service;

import it.lab.iservice.IHoaDonService;
import it.lab.modelcustom.respon.HoaDonCho;
import it.lab.repository.HoaDonRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HoaDonService implements IHoaDonService {
    @Autowired
    private HoaDonRepo _hoaDonRepo;
    @Override
    public List<HoaDonCho> layHetHoaDonCho() {
        Hoa
        return null;
    }
}
