import React, { useEffect, useState } from "react";
import "./products.css";
import logo from "./logo.png";
import cart from "./cart_icon.png";
import axios from "axios";

function Products() {
  const [data, setData] = useState([]); // accessing api data
  const [count, setCount] = useState(0); // no. of items added to cart
  const [searchFlag, setSearchFlag] = useState(false); // to display all products or seacrhed products
  const [searchInput, setSearchInput] = useState(""); // store searched word
  const [titles, setTitles] = useState([]); // store list of titles of products

  // search functionality
  const handleSearch = (searchInput) => {
    setSearchFlag(true);
    const searchList = data.filter((item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setTitles(searchList);
  };

  const handleCart = (e) => {
    e.preventDefault();
    setCount(count + 1);
    let clickedBtn = document.getElementById(e.target.id);
    clickedBtn.innerText = "Added to cart";
    clickedBtn.style.backgroundColor = "gray";
    clickedBtn.style.borderColor = "gray";
    clickedBtn.style.cursor = "default";
    clickedBtn.style.pointerEvents = "none";
  };

  // get the api data on page loading
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        if (response?.status === 200) {
          setData(response?.data);
        }
      })
      .catch((error) => {
        console.log(error);
        setData([]);
      });
  }, []);

  const categoryList = [];
  data.map((prod) => {
    if (!categoryList.includes(prod.category)) categoryList.push(prod.category);
  });

  // disply the content
  return (
    <div className="container px-xl-5 py-md-2">
      {/* navbar */}
      <nav className="navbar navbar-expand-lg">
        <div className="container fixed-top px-xl-5 py-3">
          <a className="navbar-brand mx-lg-3" href="#">
            <img src={logo} alt="shopping logo" width="70" height="60" />
          </a>
          <button
            className="navbar-toggler bg-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse px-2 justify-content-around"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0 ">
              <a
                className="navbar-brand text-white me-xl-5 mx-4"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  setSearchFlag(false);
                }}
              >
                Home
              </a>
              <a
                className="navbar-brand text-white me-xl-5 mx-4 category-link"
                href="#"
              >
                Categories{" "}
                <div class="card category-card">
                  <ul class="list-group list-group-flush ">
                    {categoryList.map((item) => (
                      <li class="list-group-item list-group-item-action list-group-item-dark">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </a>
              <a className="navbar-brand text-white me-xl-5 mx-4" href="#">
                About
              </a>
            </ul>
            <div className="input-box">
              <i className="uil uil-search"></i>
              <input
                type="text"
                placeholder="Search products"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
              />
              <button
                className="button"
                onClick={() => handleSearch(searchInput)}
              >
                Search
              </button>
            </div>
            <a className="navbar-brand mx-4 position-relative" href="#">
              <span id="itemsCount">{count}</span>
              <img src={cart} alt="cart icon" width="40" height="40" />
            </a>
          </div>
        </div>
      </nav>

      <section id="products_sec" className="pt-5 px-2 mt-5">
        <div className="row justify-content-center">
          {!searchFlag ? (
            // products section
            data.map((prod) => (
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4 d-flex justify-content-center align-items-center pt-md-0 pt-3">
                    <img
                      src={prod.image}
                      className="rounded-start"
                      alt={prod.id}
                      width="230px"
                      height="210px"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{prod.title}</h5>
                      <p className="card-text">{prod.description}</p>
                      <div className="card-text d-inline-flex align-items-center rating px-1">
                        <span>{prod.rating.rate}&nbsp;</span>
                        <span className="star">&#11088;</span>
                      </div>
                      <span className="count">&nbsp;{prod.rating.count}</span>
                      <p className="card-text mt-2 fs-5">${prod.price}</p>
                      <p className="card-text">
                        <a
                          href="#"
                          id={prod.id}
                          className="btn btn-warning"
                          onClick={(e) => handleCart(e)}
                        >
                          Add to Cart
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : titles.length ? (
            // searched products section
            titles.map((prod) => (
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4 d-flex justify-content-center align-items-center pt-md-0 pt-3">
                    <img
                      src={prod.image}
                      className="rounded-start"
                      alt={prod.id}
                      width="230px"
                      height="210px"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{prod.title}</h5>
                      <p className="card-text">{prod.description}</p>
                      <div className="card-text d-inline-flex align-items-center rating px-1">
                        <span>{prod.rating.rate}&nbsp;</span>
                        <span className="star">&#11088;</span>
                      </div>
                      <span className="count">&nbsp;{prod.rating.count}</span>
                      <p className="card-text mt-2 fs-5">${prod.price}</p>
                      <p className="card-text">
                        <a
                          href="#"
                          id={prod.id}
                          className="btn btn-warning"
                          onClick={(e) => {
                            e.preventDefault();
                            setCount(count + 1);
                          }}
                        >
                          Add to Cart
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center fs-3 text-white mt-5">
              No product found... Try to search again.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Products;
