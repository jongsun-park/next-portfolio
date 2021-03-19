import styled from "styled-components";
import { SocialGroup } from "./socials";
import { content } from "src/content";

export const Footer = () => (
  <Container id="contact-me">
    <h3 className="footer-heading">
      <a href={`mailto:${content.email}`}>
        Do you have a project?
        <br />
        Let's work together!
      </a>
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
  padding: 1rem;
  .row {
    display: flex;
    align-items: flex-start;
    .col {
      flex: 1;
    }
  }

  .footer-heading {
    font-size: 2rem;
    margin: 1rem 10px 2rem;
    line-height: 1.2;
    text-decoration: underline;
    a {
      color: var(--color-default);
    }
    &:hover a {
      color: var(--color-mint);
    }
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
