import styled from 'styled-components';
import {HiUsers} from 'react-icons/hi';
import {Link} from 'react-router-dom';
import {Container} from '../Styles/Globalstyles';

export const CategoryWrapper = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 6rem 0;
`;

export const CategoryContainer = styled(Container)`
display: flex;
flex-direction: column;
${Container};
`;

export const CategoryTitle = styled.h2`
font-size: clamp(2rem, 8vw, 5rem);
text-align: center;
margin-bottom: 3rem;
padding:10px
font-weight: bold;
@media only screen and (max-width:700px){
    margin-bottom: 0;
}
`;

export const CategoryContentContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

export const CategoryTabContainer = styled.div`
display: flex;
justify-content:center;
align-items:center;   
background-image: url("/Users/dato/My Python Stuff/Jack/Front/my-app/public/images/variousDrinks.jpeg");                                                                                               
@media only screen and (max-width:700px){
    display: none;
}                                                                            
`;

export const CategoryBtn = styled(Link)`
&:not(:last-child){
    margin-right: 3rem;
}
@media only screen and (max-width: 700px){
    display: none;
 }
`;

//Category card section

export const CategoryCardWrapper = styled.div`                                                
display: flex;                                                                                                                                                                                                                                                                                                                                                                                                                                        
justify-content: space-between;
align-items: center;
margin-top: 6rem;
flex-direction: column;
@media only screen and (min-width:1800px) {
    flex-direction: row;
}
`;

export const CategoryFeature = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 650px;
height: 320px;
background-color: #fff;
box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.18);
border-radius: 40px;
transition: all .4s ease;
margin-bottom: 5rem;
cursor: pointer;
@media only screen and (min-width: 1800px){
    margin-right: 10rem;
    padding: 0;
}
&:hover{
    box-shadow: 0px 10px 80px rgba(0, 0, 0, 0.12);
    transform: scale(1.05);
    background-color: #333;
    color: #fff;
}
@media only screen and (min-width:1000px) {
    flex-direction: row;
}
@media only screen and (max-width:900px){
    margin-bottom: 10rem;
}
@media only screen and (max-width:700px){
    width: 550px;
    margin-bottom: 3rem;
    &:hover{
        transform: scale(1.02);
    }
}
@media only screen and (max-width:600px){
    width: 500px;
}
@media only screen and (max-width:500px){
    width: 380px;
    height: 300px;
    flex-direction: column;
    justify-content: flex-start;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.10);
}
@media only screen and (max-width:400px){
    width: 330px;
}
`;

export const CategoryImg = styled.img`
height: 80%;
margin-top: 2rem;
margin-left: 2rem;
transition: all .5s ease;
&:hover {
    transform: scale(1.14) rotate(360deg);
}
@media only screen and (max-width:700px){
    height: 58%;
}
@media only screen and (max-width:600px){
    height: 50%;
}
@media only screen and (max-width:500px){
    height: 30%;
}
`;

export const CategoryFeatureContent = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
padding: 2rem;
@media only screen and (max-width:500px){
    padding: 2rem;
    align-items: center;
}
`;

export const CategoryFeatureTitle = styled.h3`
font-size: 3.6rem;
font-weight: 400;
line-height: 1.3;
margin-bottom: .6rem;
@media only screen and (max-width:700px){
    font-size: 3rem;
}
@media only screen and (max-width:600px){
    font-size: 2.5rem;
}
@media only screen and (max-width:400px){
    font-size: 2rem;
}
`;

export const CategoryFeatureText = styled.p`
font-size: 1.6rem;
padding-bottom: 1.3rem;
@media only screen and (max-width:700px){
    font-size: 1.4rem;
}
@media only screen and (max-width:400px){
    font-size: 1.3rem;
}
`;

export const CategoryFeatureDetails = styled.div`
display: flex;
align-items: center;
`;

export const CategoryFeatureItem = styled.div`
display: flex;
align-items: flex-start;
flex-direction: column;
margin-right: 2.5rem;
`;

export const CategoryItemTitle = styled.h4`
font-size: 1.4rem;
@media only screen and (max-width:400px){
    font-size: 1.3rem;
}
`;

export const CategoryItemContent = styled.div`
display: flex;
align-items: center;
`;

export const CategoryItemIcon = styled(HiUsers)`
 color: #E38B06;
 font-size: 3rem;
 padding-right: 1rem;
`;

export const CategoryItemText = styled.p`
font-size: 1.8rem;
@media only screen and (max-width:700px){
    font-size: 1.6rem;
}
`;

export const CategoryCardSection = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
@media only screen and (min-width: 900px) {
    flex-direction: row;
}
`;

export const CategorySmallCards = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
@media only screen and (min-width: 1200px){
    margin-left: 2rem;
}
@media only screen and (min-width: 1500px){
    margin-left: 3.5rem;
}
`;

export const CategoryCard = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 500px;
height: 130px;
background: #FFFFFF;
box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.15);
border-radius: 20px;
transition: all .5s ease;
margin-bottom: 4rem;
cursor: pointer;
&:hover {
    background-color: #333;
    color: #fff;
    transform: scale(1.05);
    box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.2);
}
@media only screen and (max-width:1200px) {
    width: 397px;
    margin-right: 5rem;
}
@media only screen and (max-width:1000px) {
    width: 420px;
    margin-right: 2.5rem;
}
 
@media only screen and (max-width:700px){
    width: 380px;
    &:hover {
    transform: scale(1.1);
    }
}
@media only screen and (max-width:500px){
    margin-right: 0;
    &:hover {
    transform: scale(1);
    }
}
@media only screen and (max-width:400px){
    flex-direction: column;
    width: 280px;
}
`;

export const CategoryCardImg = styled.div`
height: 10.3rem;
margin-left: -10rem;
`;

export const CategoryCardContent = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0 2rem;
`;

export const CategoryCardHeading = styled.h3`
font-size: 2.4rem;
font-weight: 400;
@media only screen and (max-width:700px){
    font-size: 2rem;
}
`;

export const CategoryCardDetails = styled.div`
display: flex;
align-items: center;
margin-top: 1.5rem;
`;

export const CategoryCardItems = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
text-align: center;
&:not(:last-child){
    margin-right: 2.5rem;
}
`;

export const CategoryCardTitle = styled.h4`
font-size: 1.4rem;
@media only screen and (max-width:700px){
    font-size: 1.2rem;
}
`;

export const CategoryCardItem = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-right: 2.5rem;
`;

export const CategoryCardIcon = styled(HiUsers)`
 color: #E38B06;
 font-size: 2rem;
 margin-right: 1.3rem;
@media only screen and (max-width:700px){
    font-size: 1.5rem;
    margin-right: 1rem;
 }
`;

export const CategoryCardText = styled.p`
font-size: 1.4rem;
@media only screen and (max-width:700px){
    font-size: 1.2rem;
}
`;



export const CategoryFeatureImg = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
height: 100%;
`;

export const Img = styled.img`
height: 10rem;
transition: all .5s ease;
&:hover {
    transform: scale(1.06) rotate(360deg);
}
@media only screen and (max-width: 1000px){
    height: 9rem;
}
@media only screen and (max-width: 400px){
    display: none;
}
`;
export const mainContainer = styled.div`
width: 100px;
height: 100px;
position: relative;                                                                        
`;
export const catDiv = styled.div`
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0; 
z-index: 10;     
`;
export const catImgAnim = styled.div`
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;                                                                      
`;