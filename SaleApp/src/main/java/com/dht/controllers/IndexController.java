/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dht.controllers;

import com.dht.pojo.Category;
import com.dht.pojo.Product;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author admin
 */
@Controller
public class IndexController {
    @RequestMapping("/")
    public String index(Model model, 
            @RequestParam Map<String, String> params) {
        List<Category> cates = List.of(new Category(1, "Mobile"), 
                new Category(2, "Table"), new Category(3, "Desktop"));
        model.addAttribute("categories", cates);
        
        List<Product> products = List.of(
                new Product(1, "iPhone 13", 12000000l, "https://res.cloudinary.com/dxxwcby8l/image/upload/v1688695888/hbf9njhnqz5bjc1t47es.jpg"),
                new Product(2, "iPhone 14", 12000000l, "https://res.cloudinary.com/dxxwcby8l/image/upload/v1688695888/hbf9njhnqz5bjc1t47es.jpg"),
                new Product(3, "Galaxy 15", 12000000l, "https://res.cloudinary.com/dxxwcby8l/image/upload/v1688695888/hbf9njhnqz5bjc1t47es.jpg"),
                new Product(4, "iPad 16", 12000000l, "https://res.cloudinary.com/dxxwcby8l/image/upload/v1688695888/hbf9njhnqz5bjc1t47es.jpg")
        );
        
        String kw = params.get("kw");
        if (kw != null && !kw.isEmpty())
            model.addAttribute("products", products.stream().filter(p -> p.getName().contains(kw)).toArray());
        else
            model.addAttribute("products", products);
        
        return "index";
    }
}
