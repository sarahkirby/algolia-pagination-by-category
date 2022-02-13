import styled from 'styled-components';

export const Container = styled.main`
  padding: 50px 90px;
  min-height: 100vh;
  background-color: #e5e5e5;
  color: #000000;
`;

export const Input = styled.input`
  margin-bottom: 41px;
  padding: 0 20px;
  height: 50px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 50px;
  color: #333333;
  width: 100%;
  max-width: 620px;
  font: inherit;
  outline: none;
`;

export const Grid = styled.div`
  --columns: 1;
  margin-bottom: 70px;
  display: grid;
  grid-gap: 30px 0;
  grid-template-columns: repeat(var(--columns), minmax(0, 1fr));

  @media only screen and (min-width: 768px) {
    --columns: 2;
    grid-gap: 25px;
  }

  @media only screen and (min-width: 1024px) {
    --columns: 3;
  }

  @media only screen and (min-width: 1200px) {
    --columns: 4;
  }
`;

export const Card = styled.div`
  padding: 20px;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  background-color: #ffffff;
  color: #000000;
`;

export const H2 = styled.h2`
  margin: 0 0 30px;
  padding-bottom: 15px;
  font-size: 25px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const H3 = styled.h3`
  margin: 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  margin-top: 20px;
  padding: 15px 20px;
  border-radius: 100px;
  background-color: #0a3b85;
  color: #ffffff;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.07em;
`;
