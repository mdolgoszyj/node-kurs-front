import styled, { css } from "styled-components"

interface ButtonProps {
    primary?: boolean;
}

const Button = styled.button<ButtonProps>`
    background: ${props => props.primary ? "gold" : "black"};
    color: ${({primary}) => primary ? "black" : "white"};
    padding: 10px;
    border: none;
`;

const $variants = {
    heading: css`
        font-size:30px;
        color:red;
        letter-spacing: 5px;
        text-decoration: underline;
    `,
    paragraph: css`
        font-size:16px;
        color:black;
        background-color: gold;
    `
}

interface ITitle {
    $variant: "heading" | "paragraph"
}

const Title = styled.h2<ITitle>`
  ${({ $variant }) => $variants[$variant] || $variants.heading}; 
`;

const AboutPage = () => {
  return (
    <div>
        <Title $variant="heading">Hello</Title>
        <Title $variant="paragraph">Hello</Title>

        <Button >Kup teraz</Button>
    </div>
  )
}

export default AboutPage

