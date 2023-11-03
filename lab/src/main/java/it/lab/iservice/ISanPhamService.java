package it.lab.iservice;

import it.lab.common.Page;
import it.lab.common.ResponObject;
import it.lab.dto.ChatLieuDTO;
import it.lab.dto.SanPhamDTO;
import it.lab.entity.ChatLieu;
import it.lab.entity.SanPham;
import it.lab.enums.APIStatus;
import it.lab.modelcustom.request.SanPhamRequest;
import it.lab.modelcustom.respon.FullThuocTinh;
import it.lab.modelcustom.respon.SanPhamChiTiet;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ISanPhamService {
    public Page<SanPhamDTO> phanTrangSanPhamTrangChu(Integer page, Integer pageSize, Long chatLieuId, Long thietKeId, Long thuongHieuId, Long mauSacId, Long loaiSanPhamId, Long kichThuocId);

    public SanPhamChiTiet chiTietSanPham(Long sanPhamId);

    public Page<ChatLieuDTO> layHetChatLieu();

    public Page<ChatLieuDTO> xoaChatLieu(Long chatLieuId);

    public Page<ChatLieuDTO> suaChatLieu(ChatLieu chatLieu);

    public Page<ChatLieuDTO> themChatLieu(ChatLieu chatLieu);

    public FullThuocTinh layHetThuocTinh();

    public ChatLieuDTO layChatLieuById(Long chatLieuId);

    public ResponObject<String, APIStatus> themSanPham(SanPhamRequest sanPham, MultipartFile hinh1, MultipartFile hinh2) throws IOException;
}
