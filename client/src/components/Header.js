import styled from 'styled-components';
import SearchBar from './SearchBar';
import { ShoppingCart } from 'react-feather';


// JSX header component with the logo to the extreme left and the navigation links to the extreme right

const Header = (cart) => {
  const cartActive = cart?.cart?.length > 0;
  const cartSize = cartActive && cart.cart.length;

  return (
    <HeaderContainer>
      <LogoContainer>
        {/* The logo redirects to the homepage when clicked */}
        <Logo
          src="https://svgshare.com/i/oCF.svg.png"
          alt="Wearably Logo"
          onClick={() => {
            window.location.href = '/';
          }}
        />
      </LogoContainer>
      <SearchBar/>
      <NavContainer>
        <NavLinks>
          <NavLink href="/product-page/all">Products</NavLink>
          <NavLink href="/about">About</NavLink>
          {
            cartActive && (
              <NavLink href="/cart">
                <ShoppingCartIconContainer>
                  <ShoppingCart style={{ color: 'black' }}/> 
                  <RedIcon>{cartSize}</RedIcon>
                </ShoppingCartIconContainer>
              </NavLink>
            )
          }
          {
            !cartActive && (
              <ShoppingCartIconContainer>
                <ShoppingCart style={{ color: 'gray' }} />
              </ShoppingCartIconContainer>
            )
          }
        </NavLinks>
      </NavContainer>
    </HeaderContainer>
  );
};



export default Header;

// Styled Components
const RedIcon = styled.div`
  background-color: red;
  width: 18px;
  height: 18px;
  border-radius: 100%;

  font-size: 9px;
  color: white;
  text-align: center;

  position: absolute;
  top: 2px;
  right: 1px;
`;
const ShoppingCartIconContainer = styled.div`
  position: relative;

  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  height: 70px;
  background-color: white;
  max-width: 90%;
  margin-right: auto;
  margin-left: auto;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0 24px;
  }
`;

const LogoContainer = styled.div`
  width: 180px;
  padding: 0 12px;
  @media (max-width: 768px) {
    width: 120px;
    padding: 0 6px;

  }
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;
// Make the elements within the navContainer fully responsive
const NavContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 30%;
  font-family: inter;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  height: 100%;
  list-style: none;
  padding: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const IconImage = styled.img`
  width: 30px;
  height: 30px;
`;

const NavLink = styled.a`
  color: black;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
`;


