import React from 'react'
import {
    FooterSection,
    FooterContainer,
    FooterNewsletter,
    FooterNewsletterTitle,
    FooterNewsletterText,
    FooterNewsletterForm,
    FooterNewsletterInput,
    FooterBtn,
    FooterLinkContainer,
    FooterLinksWrapper,
    FooterLinks,
    FooterLinkTitle,
    FooterLink,
    FooterCopyRight,
    FooterLabel
} from '../Styles/FooterStyles'

const Footer = () => {
  return (
    //   the footer is displayed on every page 
    <div>
         <FooterSection>
                <FooterContainer>
                    <FooterNewsletter>
                        <FooterNewsletterTitle>Join our listing for exclusive discounts !</FooterNewsletterTitle>
                        <FooterNewsletterText>We import novelties every week, be notified!</FooterNewsletterText>
                        <FooterNewsletterForm>
                            <FooterLabel htmlFor="email">Email address</FooterLabel>
                           <FooterNewsletterInput name="email" id="email" type="email" placeholder="Email address" />
                           <FooterBtn  >Submit</FooterBtn>
                        </FooterNewsletterForm>
                    </FooterNewsletter>
                    <FooterLinkContainer>
                        <FooterLinksWrapper>
                            <FooterLinks>
                            <FooterLink to="/about"> <FooterLinkTitle>About Us</FooterLinkTitle></FooterLink>
                            </FooterLinks>
                            <FooterLinks>
                            <FooterLink to='/'> <FooterLinkTitle>Services</FooterLinkTitle></FooterLink>
                            </FooterLinks>
                        </FooterLinksWrapper>
                        <FooterLinksWrapper>
                            <FooterLinks>
                            <FooterLink to='/'> <FooterLinkTitle>Resources</FooterLinkTitle></FooterLink>
                            </FooterLinks>
                            <FooterLinks>
                                <FooterLinkTitle>Contact</FooterLinkTitle>
                                <FooterLink to='/'>Instagram</FooterLink>
                                <FooterLink to='/'>Facebook</FooterLink>
                                <FooterLink to='/'>Youtube</FooterLink>
                                <FooterLink to='/'>Linkedin</FooterLink>
                            </FooterLinks>
                        </FooterLinksWrapper>
                    </FooterLinkContainer>
                    <FooterCopyRight to='https://github.com/dato7777'> &copy; Copyright 2022, Designed and coded with 💛 by Jacob Gorelashvili</FooterCopyRight>
                </FooterContainer>
            </FooterSection>
    </div>
  )
}

export default Footer