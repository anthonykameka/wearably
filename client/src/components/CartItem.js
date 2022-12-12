import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { ProductContext } from "./ProductContext";
import logo from "../assets/loadingIcon.gif";
import styled from "styled-components";

/// renders each item in cart
const CartItem = ({ item, handleAdd, handleRemove, occurences }) => {
  const [currentItem, setCurrentItem] = useState();
  const { allProducts, sales } = useContext(ProductContext);
  const { state, cart } = useContext(CartContext);

  /// returns array of items in cart from AllProducts based on item (itemId)
  useEffect(() => {
    if (allProducts && item) {
      const filteredArr = allProducts.filter((product) => {
        return product._id === item;
      });
      setCurrentItem(filteredArr[0]);
    }
  }, [item, allProducts, state.cartItems, cart]);
  //initialize sale as false
  let sale = false;
  //initialize saleDiscount as null
  let saleDiscount = null;
  let salePrice = null;
  //if our item id is in the sale array, sale will be true
  sales?.forEach((item) => {
    //make the discount available here
    saleDiscount = item.salesDiscount;
    if (item._id === currentItem?._id) {
      sale = true;
      //calculates the after discount price of the item
      salePrice = Math.floor(
        currentItem.price.split("$")[1] * (1 - saleDiscount)
      );
    }
  });

  return (
    <>
      {!currentItem ? (
        <Logo src={logo} alt="loading" />
      ) : (
        <>
          <ItemDiv>
            {sale ? <SaleTag>SALE</SaleTag> : <div></div>}
            <ProductImage src={currentItem.imageSrc} />
            <Container>
              <h5>{currentItem.name}</h5>
              <Sales>
                {sale ? (
                  <>
                    <OldPrice>{currentItem.price}</OldPrice>
                    <Price>${salePrice}</Price>
                  </>
                ) : (
                  <Price>{currentItem.price}</Price>
                )}
              </Sales>
              <h4>x {occurences}</h4>
              <ButtonDiv>
                {/* //call the handle add function */}
                <BtnAdd onClick={(e) => handleAdd(e, currentItem)}>
                  Add to cart
                </BtnAdd>
                <BtnRmv
                  onClick={() => {
                    handleRemove(currentItem);
                  }}
                >
                  Remove from cart
                </BtnRmv>
              </ButtonDiv>
            </Container>
          </ItemDiv>
        </>
      )}
    </>
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

const BtnAdd = styled.button`
  &hover {
    background-color: #f0f0f0;
  }
`;
const BtnRmv = styled.button`
  color: #1a202c;
  background-color: #eff0f2;
  &:hover {
    background-color: #00CC96;
    color: white;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 24px;
`;
const ProductImage = styled.img`
  width: 192px;
  height: 192px;
  border-radius: 32px;
  border: 2px solid #f6f7fb;
  padding: 8px;
`;

const ButtonDiv = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-around;
`;

const ItemDiv = styled.div`
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 48px;
  padding: 34px;
  margin-bottom: 10px;
  max-width: 700px;
  position: relative;
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
`;

export default CartItem;
