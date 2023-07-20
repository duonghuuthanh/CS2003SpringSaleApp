<%-- 
    Document   : index
    Created on : Jul 13, 2023, 6:12:38 PM
    Author     : admin
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Trang chủ</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>
    </head>
    <body>
        <c:url value="/" var="action" />
        <nav>
            <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">E-commerce Website!!!</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul class="navbar-nav me-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="${action}">Trang chủ</a>
                            </li>
                            <c:forEach items="${categories}" var="c">
                                <c:url value="/" var="searchUrl">
                                    <c:param name="cateId" value="${c.id}" />
                                </c:url>
                                <li class="nav-item">
                                    <a class="nav-link" href="${searchUrl}">${c.name}</a>
                                </li>
                            </c:forEach>
                        </ul>

                        <form class="d-flex" action="${action}">
                            <input class="form-control me-2" type="text" name="kw" placeholder="Nhập từ khóa...">
                            <button class="btn btn-primary" type="submit">Tìm</button>
                        </form>
                    </div>
                </div>
            </nav>
        </nav>

        <section class="container">
            <h1 class="text-center text-success mt-1">DANH SÁCH SẢN PHẨM</h1>
            <div>
                <a href="#" class="btn btn-info">Thêm sản phẩm</a>
            </div>
            <c:if test="${pages > 1}">
                 <ul class="pagination mt-1">
                    <li class="page-item"><a class="page-link" href="${action}">Tất cả</a></li>
                    <c:forEach begin="1" end="${pages}" var="i">
                        <c:url value="/" var="pageUrl">
                            <c:param name="page" value="${i}" />
                        </c:url>
                    <li class="page-item"><a class="page-link" href="${pageUrl}">${i}</a></li>
                    </c:forEach>
                </ul>
            </c:if>
           
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th>Id</th>
                        <th>Tên sản phẩm</th>
                        <th>Gía</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <c:forEach items="${products}" var="p">
                        <tr>
                            <td><img src="${p.image}" alt="${p.name}" width="200" /></td>
                            <td>${p.id}</td>
                            <td>${p.name}</td>
                            <td>${p.price} VNĐ</td>
                            <td>
                                <a href="#" class="btn btn-info">Cập nhật</a>
                                <button class="btn btn-danger">Xóa</button>
                            </td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
        </section>
    </body>
</html>
