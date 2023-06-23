/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dht.repository;

import com.dht.hibernatedemo.HibernateUtils;
import com.dht.pojo.Product;
import java.util.List;
import java.util.Map;
import javax.persistence.Query;
import org.hibernate.Session;

/**
 *
 * @author admin
 */
public class ProductRepository {
    public List<Product> getProducts(Map<String, String> params) {
        String kw = params.getOrDefault("kw", "");
        try (Session session = HibernateUtils.getFactory().openSession()) {
            Query q = session.createQuery("From Product WHERE name like CONCAT('%', :kw, '%')");
            q.setParameter("kw", kw);
            
            return q.getResultList();
        }
    }
}
