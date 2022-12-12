import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import logo from "../assets/loadingIcon.gif";

import { ProductContext } from "./ProductContext";
import { CartContext } from "./CartContext";

//this component controls the detail page for each product
const ProductDetails = () => {
  const [currentProduct, setCurrentProduct] = useState();
  const [company, setCompany] = useState();
  // import the add to cart func from context
  const {
    actions: { addItemToCart },
  } = useContext(CartContext);
  // grab the id from the params
  const id = useParams();
  //grab the all products from the context
  const { allProducts, sales } = useContext(ProductContext);
  //on mount, filter from the productsContext to retain
  //only the right product infos
  useEffect(() => {
    //the condition to make sure we render if all products is set
    if (allProducts) {
      const currentItem = allProducts.filter((product) => {
        return product._id === id.productId;
      });
      setCurrentProduct(currentItem[0]);
    }
  }, [allProducts]);

  //fetch to get the company info
  useEffect(() => {
    if (currentProduct) {
      fetch(`/api/get-company/${currentProduct.companyId}`)
        .then((res) => res.json())
        .then((data) => setCompany(data.data));
    }
  }, [currentProduct]);

  //initialize sale as false
  let sale = false;
  //initialize saleDiscount as null
  let saleDiscount = null;
  let salePrice = null;
  //if our item id is in the sale array, sale will be true
  sales?.forEach((item) => {
    //make the discount available here
    saleDiscount = item.salesDiscount;
    if (item._id === currentProduct?._id) {
      sale = true;
      //calculates the after discount price of the item
      salePrice = Math.floor(
        currentProduct.price.split("$")[1] * (1 - saleDiscount)
      );
    }
  });

  //handle to use the addtocart func
  const handleAdd = () => {
    addItemToCart(currentProduct._id);
  };
  return (
    <Wrapper>
      {!currentProduct || !company ? (
        <Logo src={logo} alt="loading" />
      ) : (
        <DetailsWrapper>
          <ImgContainer>
            {sale ? <SaleTag>SALE</SaleTag> : <div></div>}
            <img src={currentProduct.imageSrc} />
          </ImgContainer>

          <InfosContainer>
            <h3>{currentProduct.name}</h3>
            <Sales>
              {sale ? (
                <>
                  <OldPrice>{currentProduct.price}</OldPrice>
                  <Price>${salePrice}</Price>
                </>
              ) : (
                <Price>{currentProduct.price}</Price>
              )}
            </Sales>
            <p>{currentProduct.numInStock} in stock</p>
            <p>Manufactured by {company.name}</p>

            <StyledButton
              onClick={handleAdd}
              stock={currentProduct.numInStock}
              disabled={currentProduct.numInStock === 0 ? true : false}
            >
              {currentProduct.numInStock > 0 ? "Add to cart" : "Out of stock"}
            </StyledButton>
          </InfosContainer>
        </DetailsWrapper>
      )}
    </Wrapper>
  );
};

const Price = styled.p`
  font-weight: bold;
`;

const Sales = styled.div`
  display: flex;
  margin-right: -100px;
`;
const OldPrice = styled.p`
  text-decoration: line-through;
  color: lightgrey;
  margin-right: 10px;
`;

const SaleTag = styled.div`
  background-color: red;
  color: white;
  width: 65px;
  font-size: 15px;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 3px;
  padding-bottom: 3px;
  font-weight: bold;
  text-align: center;
  border-radius: 15px;
  position: absolute;
  top: 20px;
  left: 125px;
  z-index: 222;
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
`;

const ImgContainer = styled.div`
  flex: 1 1 49%;
  display: flex;
  width: 250px;
  height: 250px;
  justify-content: center;
  position: relative;
`;
const InfosContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 1 49%;
  & > h3 {
    max-width: 50%;
  }
`;

const DetailsWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  margin: 3em;
`;

const StyledButton = styled.button`
  margin-top: 1.5em;
  background-color: ${(props) => (props.stock === 0 ? "grey" : "#00CC96")};
  &:hover {
    transform: ${(props) => (props.stock === 0 ? "none" : "scale(1.1, 1.1)")};
  }
  &:disabled {
    pointer-events: none;
  }
`;

export default ProductDetails;
