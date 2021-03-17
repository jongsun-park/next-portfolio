import styled from "styled-components";
import { SocialGroup } from "./socials";

export const Footer = () => (
  <Container id="contact-me">
    <h3 className="footer-heading">
      Do you have a project?
      <br />
      Let's work together!
    </h3>
    <div className="row">
      <div className="col">
        <SocialGroup vertical={false} />
      </div>
      <div className="col">
        <p className="footer-copyright">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </div>
  </Container>
);

const Container = styled.footer`
  background: var(--color-light);
  padding: 3rem 1rem 1rem;
  .row {
    display: flex;
    align-items: flex-start;
    .col {
      flex: 1;
    }
  }

  .footer-heading {
    font-size: 2rem;
    margin: 10px 0 2rem 10px;
    line-height: 1.2;
  }
  .footer-copyright {
    text-align: right;
  }
  @media (max-width: 576px) {
    .row {
      flex-direction: column;
    }
    .footer-copyright {
      padding-left: 10px;
    }
  }
`;
