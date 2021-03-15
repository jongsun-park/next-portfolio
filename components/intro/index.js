import styled from "styled-components";
import Link from "next/link";

import { content } from "../../content";
import { LineButton } from "../../styles/button";
import { Container } from "../../styles/container";
const { title, jobDescription, description } = content;

const Icon = ({ stroke = "#000" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14.829"
    height="8.414"
    viewBox="0 0 14.829 8.414"
  >
    <path
      id="chevron-down"
      d="M6,9l6,6,6-6"
      transform="translate(-4.586 -7.586)"
      fill="none"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export const Intro = () => (
  <IntroContainer className="intro">
    <h2 className="intro-hello">
      Hello! <i>I'm</i> Park
    </h2>
    <p>
      <b>{jobDescription}</b>
    </p>
    <p>{description}</p>
    <Link href="/projects">
      <LineButton>
        <Icon stroke="var(--color-mint)" />
        Check My Works
      </LineButton>
    </Link>
    <div className="intro-image" />
  </IntroContainer>
);

const IntroContainer = styled(Container)`
  .intro-hello {
    font-size: 4rem;
    margin-bottom: 0;
  }
  p {
    max-width: 50%;
  }
  .intro-image {
    background-image: url("/svg/main-inllustration.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 90%;
    position: absolute;
    right: 2rem;
    top: 0;
    height: 120%;
    width: 50%;
    z-index: -1;
  }
`;
