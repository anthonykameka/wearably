import { useContext, useEffect, useState } from "react";
import { ProductContext } from "./ProductContext";
import styled from "styled-components";
import ProductCard from "./ProductCard";

const Suggestion = () => {
  //import all the products from the context
  const { allProducts } = useContext(ProductContext);
  const [randomArr, setRandonArr] = useState([]);

  //On mounts: this useeffect creates an array with 8 values
  useEffect(() => {
    setRandonArr(
      Array.from({ length: 8 }, () =>
        Math.floor(Math.random() * allProducts.length) // random number between 0 and the length of the array
      )
    );
  }, []);

  return (
    <>
      <SecondaryTitles>
        <h5> Our best sellers</h5>
        <h1>Featured wearables</h1>
      </SecondaryTitles>
      <Wrapper>
        <SuggestionsWrapper> 
        {randomArr.map((index) => {
          return (
            <ProductCard
              key={index + "randomthingsforkeys"}
              item={allProducts[index]}
            />
          );
        })}
        </SuggestionsWrapper>
      </Wrapper>
    </>
  );
};

// make the suggestionsWrapper mobile responsive and center the items inside it
const SecondaryTitles = styled.div`
  padding-top: 84px;
  display: flex;
  flex-direction: column;
  align-items: left;
  max-width: 1400px;
  margin: 0 auto;
  h5 {
    font-family: "inter", sans-serif;
    font-size: 16px;
    color: #1a202c;

    @media (max-width: 768px) {
      margin-left: 16px;
      margin-right: 16px;
    }

  }
  h1 {
    font-size: 36px;
    line-height: 48px;
    color: #1a202c;

    @media (max-width: 768px) {
      margin-left: 16px;
      margin-right: 16px;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const SuggestionsWrapper = styled.div`
  padding-top: 84px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
  grid-gap: 1rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  
`;

export default Suggestion;
