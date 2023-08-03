<%-- 
    Document   : products
    Created on : Jul 27, 2023, 5:57:29 PM
    Author     : admin
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<h1 class="text-center text-info mt-1">QUẢN LÝ SẢN PHẨM</h1>

<c:url value="/products" var="action" />
<form:form modelAttribute="product" method="post" 
           action="${action}" enctype="multipart/form-data">
    <form:errors path="*" element="div" cssClass="alert alert-danger" />
    <form:hidden path="id" />
    <form:hidden path="image" />
    <div class="form-floating mb-3 mt-3">
        <form:input type="text" class="form-control" path="name" id="name" 
                    placeholder="Tên sản phẩm" name="name" />
        <label for="name">Tên sản phẩm</label>
        <form:errors path="name" element="div" cssClass="text-danger" />
    </div>
    <div class="form-floating">
        <form:textarea class="form-control" id="description" name="description" 
                       path="description" 
                       placeholder="Mô tả sản phẩm"></form:textarea>
        <label for="description">Mô tả sản phẩm</label>
        <form:errors path="description" element="div" cssClass="text-danger" />
    </div>
    <div class="form-floating mb-3 mt-3">
        <form:input type="text" class="form-control" path="price" 
                    id="price" placeholder="Gía sản phẩm" name="price" />
        <label for="price">Gía sản phẩm</label>
        <form:errors path="price" element="div" cssClass="text-danger" />
    </div>
    <div class="form-floating">
        <form:select class="form-select" id="cate" name="cate" 
                     path="categoryId">
            <c:forEach items="${categories}" var="c">
                <c:choose>
                    <c:when test="${c.id == product.categoryId.id}"> <option value="${c.id}" selected>${c.name}</option></c:when>
                    <c:otherwise> <option value="${c.id}">${c.name}</option></c:otherwise>
                </c:choose>
               
            </c:forEach>
        </form:select>
        <label for="cate" class="form-label">Danh mục sản phẩm</label>
    </div>
    <div class="form-floating mb-3 mt-3">
        <form:input type="file" class="form-control" path="file" id="file"/>
        <label for="price">Ảnh sản phẩm</label>
        <c:if test="${product.image != null}">
            <img src="${product.image}" width="120" />
        </c:if>
    </div>
    <div class="form-floating mb-3 mt-3">
        <button type="submit" class="btn btn-info" >
            <c:choose>
                <c:when test="${product.id != null}">Cập nhật sản phẩm</c:when>
                <c:otherwise>Thêm sản phẩm</c:otherwise>
            </c:choose>
            
        </button>
    </div>
</form:form>