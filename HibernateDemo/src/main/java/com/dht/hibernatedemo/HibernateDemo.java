/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Project/Maven2/JavaApp/src/main/java/${packagePath}/${mainClassName}.java to edit this template
 */

package com.dht.hibernatedemo;

import com.dht.pojo.Category;
import com.dht.pojo.Product;
import com.dht.repository.ProductRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.persistence.Query;
import org.hibernate.Session;

/**
 *
 * @author admin
 */
public class HibernateDemo {

    public static void main(String[] args) {
        try (Session s = HibernateUtils.getFactory().openSession()) {
            Query q = s.createNamedQuery("Category.findById", Category.class);
            q.setParameter("id", 1);
            List<Category> cates = q.getResultList();
            cates.forEach(p -> System.out.println(p.getName()));
        }
//        Map<String, String> params = new HashMap<>();
//        params.put("kw", "Galaxy");
        
//        ProductRepository pr = new ProductRepository();
//        pr.getProducts(params).forEach(p -> System.out.printf("%d - %s: %.1f - %s\n", 
//                    p.getId(), p.getName(), p.getPrice(), p.getCategory().getName()));
//        try (Session s = HibernateUtils.getFactory().openSession()) {
//            Query q = s.createQuery("FROM Product");
//            List<Product> prods = q.getResultList();
//            prods.forEach(p -> System.out.printf("%d - %s: %.1f - %s\n", 
//                    p.getId(), p.getName(), p.getPrice(), p.getCategory().getName()));
//        }
    }
}
