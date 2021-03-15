import Link from "next/link";
import styled from "styled-components";
import { SocialGroup } from "./socials";
import { useRouter } from "next/router";

const routes = [
  {
    name: "Home",
    path: "/",
  },
  { name: "Project", path: "/projects" },
  {
    name: "Blog",
    path: "/posts",
  },
  {
    name: "Contact Me",
    path: "#contact-me",
  },
];

export const Header = () => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <Container>
      <nav className="site-navigation">
        <Link href="/">
          <a className="site-logo">PARK.</a>
        </Link>
        {routes.map(({ name, path }) => (
          <Link key={name} href={path}>
            <a className={path === pathname ? "active" : ""}>{name}</a>
          </Link>
        ))}
      </nav>
      <SocialGroup vertical={true} />
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .site-navigation {
    a {
      display: inline-block;
      margin-right: 10px;
      text-transform: uppercase;
      color: var(--color-default);

      position: relative;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: -4px;
        height: 100%;
        width: 0;
        background: var(--color-primary-light);
        opacity: 0.2;
        z-index: -1;
        transition: all ease-out 100ms;
      }

      &.active::after {
        width: 2rem;
        opacity: 0.2;
      }

      &:hover {
        text-decoration: none;
      }

      &:hover::after {
        width: calc(100% + 8px);
      }
    }
    .site-logo {
      background: var(--color-default);
      color: var(--color-light);
      padding: 0.5rem 1rem;
      font-weight: bold;
      margin-right: 30px;

      &:hover {
        background: var(--color-primary-light);
      }
      &:hover::after {
        width: 100%;
      }
    }
  }
`;
