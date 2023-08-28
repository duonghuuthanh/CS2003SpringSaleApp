import { useContext, useEffect, useState } from "react";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import cookie from "react-cookies";
import { useSearchParams } from "react-router-dom";
import { MyCartContext } from "../App";
import Apis, { endpoints } from "../configs/Apis";
import MySpinner from "../layout/MySpinner";

const Home = () => {
    const [cartCounter, cartDispatch] = useContext(MyCartContext);
    const [products, setProducts] = useState(null);
    const [q] = useSearchParams();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                let e = endpoints['products'];

                let cateId = q.get("cateId");
                if (cateId !== null && cateId !== "") {
                    e = `${e}?cateId=${cateId}`;
                } else {
                    let kw = q.get("kw");
                    if (kw !== null && kw !== "") 
                        e = `${e}?kw=${kw}`;
                }

                let res = await Apis.get(e);
                setProducts(res.data)
            } catch (ex) {
                console.error(ex);
            }
        }

        loadProducts();
    }, [q]);

    const order = (p) => {
        cartDispatch({
            "type": "inc",
            "payload": 1
        });

        let cart = cookie.load("cart") || null;
        if (cart === null)
            cart = {};

        if (p.id in cart) {
            // đã có trong giỏ
            cart[p.id]["quantity"] += 1;
        } else {
            // chưa có trong giỏ
            cart[p.id] = {
                "id": p.id,
                "name": p.name,
                "unitPrice": p.price,
                "quantity": 1
            }
        }

        cookie.save("cart", cart);
    }

    if (products === null)
        return <MySpinner />

    if (products.length === 0)
        return <Alert variant="info" className="mt-5">Không có sản phẩm nào!</Alert>

    return <>
        <Row>
            {products.map(p => {
                return <Col xs={12} md={3} className="mt-1">
                            <Card>
                            <Card.Img variant="top" src={p.image} />
                                <Card.Body>
                                    <Card.Title>{p.name}</Card.Title>
                                    <Card.Text>{p.price} VNĐ</Card.Text>
                                    <Button variant="primary">Xem chi tiết</Button>
                                    <Button variant="danger" onClick={() => order(p)}>Đặt hàng</Button>
                                </Card.Body>
                            </Card>
                        </Col>
            })}
            
        </Row>
    </>
}

export default Home;