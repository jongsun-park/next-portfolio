import Image from "next/image";
import styled from "styled-components";

import { content } from "../../content";
const { email, github, linkedin } = content;
export const SocialGroup = ({ iconsize = 16, vertical = false }) => (
  <Container className={`social-group ${vertical ? "vertical" : ""}`}>
    <a href={`mailto:${email}`} target="_blank" rel="noopener noreferer">
      <Image
        src="/svg/mail.svg"
        alt="mail"
        width={iconsize}
        height={iconsize}
      />
    </a>
    <a href={linkedin} target="_blank" rel="noopener noreferer">
      <Image
        src="/svg/linkedin.svg"
        alt="linkedin"
        width={iconsize}
        height={iconsize}
      />
    </a>
    <a href={github} target="_blank" rel="noopener noreferer">
      <Image
        src="/svg/github.svg"
        alt="github"
        width={iconsize}
        height={iconsize}
      />
    </a>
    <a
      href="/assets/jongsun_park_resume.pdf"
      target="_blank"
      rel="noopener noreferer"
      download
    >
      <Image
        src="/svg/download.svg"
        alt="download resume"
        width={iconsize}
        height={iconsize}
      />
    </a>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 1;

  a {
    display: inline-block;
    padding: 4px 10px;
  }
  &.vertical {
    position: fixed;
    top: 0;
    right: 0;
    flex-direction: column;
    padding-left: 3rem;
    background: rgb(255, 255, 255);
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 78%
    );
  }
`;
