/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dht.repository;

import com.dht.hibernatedemo.HibernateUtils;
import com.dht.pojo.Product;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.hibernate.Session;

/**
 *
 * @author admin
 */
public class ProductRepository {
    public static final int PAGE_SIZE = 4;
    
    public List<Product> getProducts(Map<String, String> params) {
        
        try (Session session = HibernateUtils.getFactory().openSession()) {
            CriteriaBuilder b = session.getCriteriaBuilder();
            CriteriaQuery<Product> q = b.createQuery(Product.class);
            Root r = q.from(Product.class);
            q.select(r);
            
            if (params != null) {
                List<Predicate> predicates = new ArrayList<>();
                
                String kw = params.get("kw");
                if (kw != null && !kw.isEmpty()) 
                    predicates.add(b.like(r.get("name"), String.format("%%%s%%", kw)));
                
                String fromPrice = params.get("fromPrice");
                if (fromPrice != null && !fromPrice.isEmpty()) 
                    predicates.add(b.greaterThanOrEqualTo(r.get("price"), Long.parseLong(fromPrice)));
                
                String toPrice = params.get("toPrice");
                if (toPrice != null && !toPrice.isEmpty()) 
                    predicates.add(b.lessThanOrEqualTo(r.get("price"), Long.parseLong(toPrice)));
                
                String cateId = params.get("cateId");
                if (cateId != null && !cateId.isEmpty()) 
                    predicates.add(b.equal(r.get("categoryId"), Long.parseLong(cateId)));
                
                q.where(predicates.toArray(Predicate[]::new));
            }
            
            Query query = session.createQuery(q);
            
            if (params != null) {
                String page = params.getOrDefault("page", "1");
                query.setMaxResults(PAGE_SIZE);
                query.setFirstResult((Integer.parseInt(page) - 1) * PAGE_SIZE);
            }
            
            return query.getResultList();
        }
    }
}
