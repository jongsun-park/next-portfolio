import styled, { css } from "styled-components";

const buttonCss = css`
  border: none;
  padding: 10px 20px;
  text-decoration: none;
  color: var(--color-mint);
  background: none;
  text-transform: uppercase;
  font-weight: bold;
  &:focus {
    outline: none;
  }
  cursor: pointer;
`;

export const Button = styled.button`
  ${buttonCss}
  border: 1px solid var(--color-mint);
  font-size: 12px;
  margin-top: 1rem;
  transition: all ease-out 100ms;

  &:hover {
    background: var(--color-mint);
    color: var(--color-light);
  }
`;

export const LineButton = styled.button`
  ${buttonCss}
  padding-left: 0;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
    border: 1px solid var(--color-mint);
    width: 2rem;
    height: 2rem;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all ease-out 100ms;
  }

  &::after {
    content: "";
    position: absolute;
    top: 48%;
    left: calc(100% - 10px);
    background: var(--color-light);
    width: 100px;
    height: 2px;
    transition: all ease-out 100ms;
  }

  &:hover {
    &::after {
      background: var(--color-mint);
    }
    svg {
      background: var(--color-mint);
      path {
        stroke: var(--color-light);
      }
    }
  }
`;
