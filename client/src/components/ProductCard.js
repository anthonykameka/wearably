import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProductContext } from "./ProductContext";
const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  // Bring in sales which is a random array of items and discounts rate from allProducts//
  // it is calculated only once in the file (when the fetch occurs )
  // alternatively, this  logic could have been created and put into the database.
  const { sales } = useContext(ProductContext);
  // initialize sale as false
  let sale = false;
  // console.log(sales)
  let salePrice = null;
  let salesDiscount = null;
  // if our item Id is in that array of sale ids, toggle sale to true.. get salesdisocunt rate
  sales?.forEach((saleItem, index) => {
    salesDiscount = saleItem.salesDiscount;

    if (saleItem._id === item?._id) {
      sale = true;
    }
  });

  let roundedItemPrice = Math.round(item.price.slice(1)); // round the last price and remove dollar sign
  salePrice = roundedItemPrice * (1 - salesDiscount); // apply discount rate to old price
  salePrice = parseFloat(salePrice.toFixed(0)); // fixing float

// if user hits a product, navigate that its page

  const handleNavigate = () => {
    navigate(`/products/${item._id}`);
  };
  // shorter item name for aesthical reasons
  let shortItemName = item.name.split(" ").slice(0, 6).join(" ");
  // console.log(item.price)

  return (
    <StyledNavLink onClick={handleNavigate}>
      <Wrapper>
        {sale ? <SaleTag>SALE</SaleTag> : <div></div>}
        <ProductImage src={item.imageSrc} />
        <Name>{shortItemName}</Name>
        <StyledButtonCategory category={item.category}>
          <StyledCategory category={item.category}>
            {item.category}
          </StyledCategory>
          <Sales>
            {sale ? (
              <>
                <OldPrice>${roundedItemPrice}</OldPrice>
                <Price>${salePrice}</Price>
              </>
            ) : (
              <Price>${roundedItemPrice}</Price>
            )}
          </Sales>
        </StyledButtonCategory>
      </Wrapper>
    </StyledNavLink>
  );
};
const Sales = styled.div`
  display: flex;
  margin-right: -100px;
`;
const OldPrice = styled.p`
  text-decoration: line-through;
  color: lightgrey;
  margin-right: 10px;
`;
const StyledCategory = styled.p`
  color: ${(props) =>
    props.category === "Fitness"
      ? "#00CC96"
      : props.category === "Lifestyle"
      ? "#A066FF"
      : props.category === "Medical"
      ? "#2975FF"
      : props.category === "Entertainment"
      ? "#FF7F23"
      : "grey"};
  background-color: ${(props) =>
    props.category === "Fitness"
      ? "#D7FFF4"
      : props.category === "Lifestyle"
      ? "#F4ECFF"
      : props.category === "Medical"
      ? "#E1ECFF"
      : props.category === "Entertainment"
      ? "#FFEADB"
      : "lightgrey"};
  font-weight: bolder;
  font-size: 14px;
  border-radius: 48px;
  margin: 5px 40px;
  margin-left: -110px;
  text-align: center;
  padding: 2px 10px;
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
const StyledButtonCategory = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;
const StyledNavLink = styled.a`
  &:hover {
    cursor: pointer;
    background-color: #f6f7fb;
    border-radius: 48px;
  }
`;
const Price = styled.p`
  font-weight: bold;
`;
const Name = styled.p`
  font-weight: bold;
`;
const Wrapper = styled.div`
  width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 5px;
  position: relative;
  padding: 10px;
`;
const ProductImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 48px;
`;
export default ProductCard;
