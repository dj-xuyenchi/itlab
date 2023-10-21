package it.lab.service;

import it.lab.entity.NguoiDung;
import it.lab.iservice.TestService;
import it.lab.modelcustom.NguoiDungCustom;
import it.lab.repository.NguoiDungRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NguoiDungService implements TestService {
    @Autowired
    private NguoiDungRepo _nguoiDungRepo;

//    @Override
//    public List<NguoiDungCustom> layNguoiDung() {
//        return _nguoiDungRepo.layDuLieu();
//    }


    @Override
    public List<NguoiDungCustom> layNguoiDung() {
        return null;
    }

    @Override
    public Page<NguoiDung> getPage(Pageable pageable) {
        return _nguoiDungRepo.findAll(pageable);
    }

    @Override
    public List<NguoiDung> getAll() {
        return _nguoiDungRepo.findAll();
    }

    @Override
    public NguoiDung save(NguoiDung nguoiDung) {
        return _nguoiDungRepo.save(nguoiDung);
    }

    @Override
    public void deleteById(long id) {
        _nguoiDungRepo.deleteById(id);
    }

    @Override
    public NguoiDung update(NguoiDung nguoiDung,Long id) {
        nguoiDung=_nguoiDungRepo.findById(id).orElse(null);
        return _nguoiDungRepo.save(nguoiDung);
    }

    @Override
    public NguoiDung findById(long id) {
        return _nguoiDungRepo.findById(id).orElse(null);
    }
}
