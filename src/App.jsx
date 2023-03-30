import { check, nike, trash } from "./assets";
import { useEffect, useState } from "react";

import classNames from "classnames/bind";
import fakedata from "./data/shoes.json";
import style from "./App.css";

const cx = classNames.bind(style);

function App() {
  const [data, setData] = useState(fakedata.shoes);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cartItems"))) {
      setCartItems(JSON.parse(localStorage.getItem("cartItems")));
    }
  }, []);

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(Math.round(total * 100) / 100);
  }, [cartItems]);

  const handleAddToCart = (item) => {
    let updateCart = [];

    const newItem = {
      // lấy thông tin sản phẩm được add
      id: item.id,
      image: item.image,
      name: item.name,
      description: item.description,
      price: item.price,
      color: item.color,
      quantity: 1,
    };

    if (!JSON.parse(localStorage.getItem("cartItems"))) {
      updateCart.push(newItem);
      localStorage.setItem("cartItems", JSON.stringify(updateCart));
      setCartItems(updateCart);
    } else {
      updateCart = JSON.parse(localStorage.getItem("cartItems"));
      var result = updateCart.find((itemCart) => {
        if (itemCart.id === newItem.id) {
          return itemCart.id === newItem.id;
        } else {
          return undefined;
        }
      });

      if (!result) {
        updateCart.push(newItem);
      } else {
        result.quantity += 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(updateCart));
      setCartItems(updateCart);
    }
  };

  const handleMinusItem = (e, item) => {
    let updateCart = JSON.parse(localStorage.getItem("cartItems"));

    let result = updateCart.find((itemCart) => {
      return itemCart.id === item.id;
    });
    if (result.quantity > 1) {
      result.quantity -= 1;
      localStorage.setItem("cartItems", JSON.stringify(updateCart));
      setCartItems(updateCart);
    } else {
      handleDelete(e, item.id);
    }
  };

  const handlePlusItem = (item) => {
    let updateCart = JSON.parse(localStorage.getItem("cartItems"));

    let result = updateCart.find((itemCart) => {
      return itemCart.id === item.id;
    });

    result.quantity += 1;
    localStorage.setItem("cartItems", JSON.stringify(updateCart));
    setCartItems(updateCart);
  };

  const handleDelete = (e, id) => {
    if (e) {
      if (
        e.target.parentElement.parentElement.parentElement.parentElement
          .classList.contains('cartItem')
      ) {
        e.target.parentElement.parentElement.parentElement.parentElement.classList.add(
          "cartItemDel"
        );
      }
    }

    setTimeout(() => {
      let updateCart = JSON.parse(localStorage.getItem("cartItems"));
      updateCart = updateCart.filter((itemCart) => {
        return itemCart.id !== id;
      });
      localStorage.setItem("cartItems", JSON.stringify(updateCart));
      setCartItems(updateCart);
    }, 800);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="card">
          <div className="cardHead">
            <img className="cardHead-img" src={nike} alt="" />
          </div>
          <div className="cardTitle">Our Products</div>
          <div className="cardBody">
            {data?.map((item) => (
              <div key={item.id} className="cardBodyItem">
                <div
                  className="cardBodyItem-img"
                  style={{ backgroundColor: `${item.color}` }}
                >
                  <img src={item.image} alt="" />
                </div>
                <div className="cardBodyItem-name">{item.name}</div>
                <div className="cardBodyItem-description">
                  {item.description}
                </div>
                <div className="cardBodyItem-bottom">
                  <div className="cardBodyItem-price">${item.price}</div>
                  {cartItems.find((i) => i.id === item.id) && (
                    <div className="cardBodyItem-check">
                      <img src={check} alt="" />
                    </div>
                  )}

                  {!cartItems.find((i) => i.id === item.id) && (
                    <div
                      className="cardBodyItem-btn"
                      onClick={() => handleAddToCart(item)}
                    >
                      ADD TO CART
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="cardHead">
            <img className="cardHead-img" src={nike} alt="" />
          </div>
          <div className="cardTitle">
            Your cart
            <span className="totalPrice">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="cardBody">
            <div className="cart">
              {cartItems &&
                cartItems?.map((item, index) => (
                  <div key={item.id} className={cx("cartItem", {})}>
                    <div className="cartItemLeft">
                      <div
                        className={cx("cartItemLeft-circle", {
                          cartItemZoom: cartItems.length - 1 === index,
                        })}
                        style={{ backgroundColor: `${item.color}` }}
                      >
                        <div className="cartItemLeft-img">
                          <img src={item.image} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="cartItemRight">
                      <div
                        className={cx("cartItemRight-name", {
                          nameAni: cartItems.length - 1 === index,
                        })}
                      >
                        {item.name}
                      </div>
                      <div
                        className={cx("cartItemRight-price", {
                          priceAni: cartItems.length - 1 === index,
                        })}
                      >
                        ${item.price}
                      </div>
                      <div
                        className={cx("cartItemRight-bottom", {
                          bottomAni: cartItems.length - 1 === index,
                        })}
                      >
                        <div className="cartItemRight-bottom-left">
                          <div
                            className="cartItemRight-bottom-icon"
                            onClick={(e) => handleMinusItem(e, item)}
                          >
                            -
                          </div>
                          <div className="cartItemRight-bottom-quantity">
                            {item.quantity}
                          </div>
                          <div
                            className="cartItemRight-bottom-icon"
                            onClick={() => handlePlusItem(item)}
                          >
                            +
                          </div>
                        </div>
                        <div
                          className="cartItemRight-bottom-right"
                          onClick={(e) => handleDelete(e, item.id)}
                        >
                          <img src={trash} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {cartItems.length === 0 && (
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      margin: "14px 0",
                      opacity: "0.8",
                    }}
                  >
                    Your cart is empty.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
