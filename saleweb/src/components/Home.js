import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";
import MySpinner from "../layout/MySpinner";

const Home = () => {
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
                                    <Button variant="danger">Đặt hàng</Button>
                                </Card.Body>
                            </Card>
                        </Col>
            })}
            
        </Row>
    </>
}

export default Home;