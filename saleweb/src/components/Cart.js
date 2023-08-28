import { useContext, useState } from "react";
import { Alert, Button, Form, Table } from "react-bootstrap";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { MyCartContext, MyUserContext } from "../App";
import { authApis, endpoints } from "../configs/Apis";

const Cart = () => {
    const [user, ] = useContext(MyUserContext);
    const [, cartDispatch] = useContext(MyCartContext);
    const [cart, setCart] = useState(cookie.load("cart") || null);

    const deleteItem = (item) =>{
        if (item.id in cart) {
            cartDispatch({
                "type": "dec",
                "payload": item.quantity
            });
    
            setCart(current => {
                delete current[item.id];
                return current;
            });
        }
    }

    const updateItem = () => {
        cookie.save("cart", cart);

        cartDispatch({
            "type": "update",
            "payload": Object.values(cart).reduce((init, current) => init + current["quantity"], 0)
        });
    }

    const pay = () => {
        const process = async () => {
            let res = await authApis().post(endpoints['pay'], cart);
            if (res.status === 200) {
                cookie.remove("cart");
                setCart([]);

                cartDispatch({
                    "type": "update", 
                    "payload": 0
                });
            }
        }

        process();
    }

    if (cart === null)
        return <Alert variant="info">Không có sản phẩm trong giỏ!</Alert>

    if (cart.length === 0)
        return <Alert variant="info">Thanh toán thành công!</Alert>

    return <>
        <h1 className="text-center text-info mt-2">GIỎ HÀNG</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Tên sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {Object.values(cart).map(c => {
                    return <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.name}</td>
                                <td>{c.unitPrice} VNĐ</td>
                                <td>
                                    <Form.Control type="number" value={cart[c.id]["quantity"]} onBlur={updateItem}
                                        onChange={e => setCart({...cart, [c.id]: {...cart[c.id], "quantity": parseInt(e.target.value)}})} />
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => deleteItem(c)}>&times;</Button>
                                </td>
                            </tr>
                })}
                
            </tbody>
        </Table>

        {user===null?<p>Vui lòng <Link to="/login?next=/cart">đăng nhập</Link> để thanh toán!</p>:<Button onClick={pay} variant="info" className="mt-2 mb-2">Thanh toán</Button>}
        

    </>
}

export default Cart;