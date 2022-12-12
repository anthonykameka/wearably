import classNames from "classnames"
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ProductContext } from "./ProductContext";
import logo from "../assets/loadingIcon.gif";

const Pagination = props => {
    //props from Product Page, go there to see more
    const {
        currentPage, // current page
        setCurrentPage, // set current page
        products, // products being paginated
        params, // params of products page
    } = props;
 
    const limit = 12; // PAGINATION LIMIT OF ITEMS PER PAGE. 
    let pages = products?.length/limit; // number of pages is total # of products/limit
    pages = Math.ceil(pages) // round up page total
    
    useEffect(() => {
        setCurrentPage(1) // everytime params change, reset current page to 1
    }, [params])
    
    // if user presses forward arrow, increase by 1. if it is at last page, do not allow to increase page number
    const currentPageHandler = () => {
        if (currentPage >= pages) {
        }
        else {
            setCurrentPage(currentPage + 1)
    }
       
    }
  // if user presses back arrow, decrease by 1. if it is at first page, do not allow to decrease page number
    const backPageHandler = () => {
        if (currentPage <= 1) {
        }
        else {
            setCurrentPage(currentPage - 1)
        }
    }

    return(
        <>
        <Wrapper>
            {
            !currentPage? 
            <Logo src={logo} alt="loading" />
            : 
            <>
        <PageOfPage className="pagination">
            {currentPage} of {pages} pages
            
        </PageOfPage>
        <NextPageContainer>
            <NextPage>Next Page</NextPage>
            <button onClick={backPageHandler}>{"<"}</button>
            <button onClick={currentPageHandler}>{">"}</button>
        </NextPageContainer>
        </>
        }
        </Wrapper>
        </>
        
    )
    
};
const Logo = styled.img`
  width: 50px;
  height: 50px;
`;
const NextPageContainer = styled.div`
display:flex;
justify-content: space-between;
width: 200px;
margin-right: 10px;
button {
         border: none;
            background-color: #EFF0F2;
            color: black;
   }`
const NextPage = styled.div``
const PageOfPage = styled.div`
`
const Wrapper = styled.div`
margin: 100px 100px;
justify-content: center;
align-items: center;
width: 80%;
display:flex;
justify-content: space-between;`
export default Pagination;