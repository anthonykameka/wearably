import styled from "styled-components";
import { Facebook, Instagram, Twitter } from 'react-feather';
//4 column footer with 1 column for each of the following: 
  //1. Logo, copyright notice and links to social media
  //2. Support
  //3. Legal
  //4. About

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinksWrapper>
        <FooterDesc>
          <FooterLogo>
            <img src="https://svgshare.com/i/oCF.svg.png"
            alt="Wearably Logo"
            onClick={() => {
              window.location.href = '/';
            }}
        />
          </FooterLogo>
          <FooterCopyRight>
            <p>© 2021. All rights reserved.</p>
          </FooterCopyRight>
          <FooterSocialMedia>
          <IconWrapper>
            <a href="https://www.facebook.com/">
              <Facebook stroke="black"/>
            </a>
          </IconWrapper>
          <IconWrapper>
            <a href="https://www.instagram.com/">
              <Instagram stroke="black"/>
            </a>
          </IconWrapper>
          <IconWrapper>
            <a href="https://www.twitter.com/">
              <Twitter stroke="black"/>
            </a>
          </IconWrapper>
          </FooterSocialMedia>
        </FooterDesc>
        <FooterLinkItems>
          <h2>Support</h2>
          <p>Return Policy</p>
          <p>Customer Service</p>
          <p>Financing</p>
          <p>Sponsorships</p>
        </FooterLinkItems>
      </FooterLinksWrapper>
      <FooterLinksWrapper>
        <FooterLinkItems>
          <h2>Legal</h2>
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
          <p>Data Protection</p>
        </FooterLinkItems>
        <FooterLinkItems>
          <h2>Company</h2>
          <a href="/about">About</a>
          <a href="/product-page">Products</a>

        </FooterLinkItems>
      </FooterLinksWrapper>
    </FooterContainer>
  );
};


const FooterContainer = styled.div`
  padding: 5rem calc((100vw - 1300px) / 2);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  color: #000;
  width: 90%;
`;

const FooterLinksWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSocialMedia = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100px;
  margin-bottom: 1rem;
  gap: 1rem;
`;

//Wrap the images on a circle that changes color on hover
const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F6F7FB;
  border-radius: 50%;
  padding: 5px;
  stroke: black;


  &:hover {
    font-size: 16px;
    background-color: #f9f9f9;
    border-radius: 50%;
    transition: all 0.3s ease-in-out;
    background-color: #A4F3DE;

  }
`;

const FooterCopyRight = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const FooterDesc = styled.div`
  padding: 0 2rem;
  
  @media screen and (max-width: 400px) {
    padding: 1rem;
  }
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0rem;
  cursor: pointer;

  img {
    width: 6rem;
    height: 6rem;

    @media screen and (max-width: 400px) {
      width: 5rem;
      height: 5rem;
    }
  }
`;

const FooterLinkItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 2rem;
  //add spaceè between the links 
  gap: 1rem;

  @media screen and (max-width: 400px) {
    padding: 1rem;
  }

  h2 {
    font-size: 18px;
    margin-bottom: 16px;
    font-family: "Inter", sans-serif;
    background-color:white;
    color:black;
    //align to the left
    text-align: left;
    
  }

  p {
    font-size: 16px;
    margin-bottom: 0.5rem;
    font-family: "Inter", sans-serif;
    cursor: pointer;
    color: #1A202C;
  }

  a {
    font-family: "Inter", sans-serif;
    font-size: 16px;
    text-decoration: none;
    color: black;
  }

  a:hover {
    font-family: "Inter", sans-serif;
    font-size: 16px;
    color: #2975FF;
    transition: 0.3s ease-out;
  }

  img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }

  @media screen and (max-width: 820px) {
    padding: 2rem;
  }

  @media screen and (max-width: 400px) {
    padding: 1rem;
  }
`;



export default Footer;
