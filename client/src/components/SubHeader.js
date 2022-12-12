import { useContext, useEffect } from "react"
import { ProductContext } from "./ProductContext"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

const SubHeader = () => {
    const navigate = useNavigate();
    const {
    cats,
    setSelectedCat,
    } = useContext(ProductContext)
    const handleCatClick = (ev) => {
        ev.preventDefault();
        setSelectedCat(ev.target.innerText)
        navigate(`/product-page/${ev.target.innerText.toLowerCase()}`)
    }

    const homeHandler = () => {
        navigate("/")
    }

    const saleHandler = () => {
        navigate("/product-page/deals")
    }  

    return (
        <Wrapper>
            {
            cats?
            <><Category onClick={homeHandler}>Home</Category> <Category onClick={saleHandler}>Deals</Category></>  
            : <div></div>
            }
            {
            cats? 
            cats.map((cat => {
                return (
                    <Category onClick={handleCatClick}>{cat}</Category>
                )
            }))
            :<div></div>
            }
        </Wrapper>
    )
}


const Wrapper = styled.div`
    padding: 0px 10px;
    display:flex;
    justify-content: space-around;
    border-bottom: 1px solid #e0e0e0;
    border-top: 1px solid #e0e0e0;
    // center the text
    width: 100%;
    padding-top: 5px;
    padding-bottom: 5px;
    // hide the wrapper and its contents on mobile
    @media (max-width: 768px) {
        display: none;
    }
`
const Category = styled.button`
    font-family: 'inter', sans-serif;
    font-size: 1.2rem;
    background-color: transparent;
    color: black;
    text-transform: uppercase;
    width: 200px;
    font-size:16px;
    font-weight: 600;
    &:hover {
        background-color: #00CC96;
        color: white;
    }
`
export default SubHeader