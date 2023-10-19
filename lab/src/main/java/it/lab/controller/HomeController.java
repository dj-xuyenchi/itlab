package it.lab.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class HomeController {
    @GetMapping ("/index")
    public String getIndexPage() {
        return "index"; // Trả về tên của trang JSP, Spring sẽ tự động tìm nó trong thư mục "WEB-INF/jsp/"
    }
}
