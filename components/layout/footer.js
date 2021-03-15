import styled from "styled-components";
import { SocialGroup } from "./socials";

export const Footer = () => (
  <Container id="contact-me">
    <div className="col">
      <h3 className="footer-heading">
        Do you have a project?
        <br />
        Let's work together!
      </h3>
      <SocialGroup vertical={false} />
    </div>
    <div className="col">
      <p className="footer-copyright">
        © {new Date().getFullYear()} All rights reserved
      </p>
    </div>
  </Container>
);

const Container = styled.footer`
  background: var(--color-light);
  display: flex;
  align-items: flex-end;
  padding: 3rem 1rem 1rem;
  .col {
    flex: 1;
  }
  .footer-heading {
    font-size: 2rem;
    margin: 0 0 2rem 0;
    line-height: 1.2;
  }
  .footer-copyright {
    text-align: right;
  }
`;
