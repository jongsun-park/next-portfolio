import Link from "next/link";
import styled, { css } from "styled-components";
import { SocialGroup } from "./socials";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { content } from "src/content";

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
    path: `mailto:${content.email}`,
  },
];

export const SideBar = ({ open, setOpen }) => {
  const router = useRouter();
  const { pathname } = router;
  useEffect(() => {
    const body = document.querySelector("body");
    body.style.position = "fixed";
    return () => {
      const body = document.querySelector("body");
      body.style.position = "relative";
    };
  }, []);

  return (
    <SidebarContainer
      onClick={() => setOpen(!open)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h1 className="sidebar-logo">Park.</h1>
      {routes.map(({ name, path }) => (
        <Link key={name} href={path}>
          <a className={path === pathname ? "active" : ""}>{name}</a>
        </Link>
      ))}
    </SidebarContainer>
  );
};

const MobileNav = ({ open, setOpen }) => {
  return (
    <>
      <MobileNavContainer className="mobile-nav">
        <Image
          src="/svg/mobile-nav.svg"
          width="32"
          height="32"
          onClick={() => setOpen(!open)}
        />
      </MobileNavContainer>
    </>
  );
};

const DesktopNav = ({ pathname }) => {
  return (
    <div className="desktop-nav">
      {routes.map(({ name, path }) => (
        <Link key={name} href={path}>
          <a className={path === pathname ? "active" : ""}>{name}</a>
        </Link>
      ))}
    </div>
  );
};

export const Header = ({ open, setOpen }) => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <Container>
      <nav className="site-navigation">
        <Link href="/">
          <a className="site-logo">PARK.</a>
        </Link>
        <MobileNav open={open} setOpen={setOpen} />
        <DesktopNav pathname={pathname} />
      </nav>
      <SocialGroup vertical={true} />
    </Container>
  );
};

const LinkCss = css`
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
`;

const MobileNavContainer = styled.div`
  width: 2rem;
  height: 2rem;
  display: grid;
  place-content: center;
  position: static;
`;

const SidebarContainer = styled(motion.div)`
  .sidebar-logo {
    font-size: 3rem;
    color: white;
    margin-bottom: 3rem;
  }
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: var(--color-mint);
  z-index: 3;
  display: grid;
  place-content: center;

  ${LinkCss}

  a {
    color: var(--color-light);
    font-size: 2rem;
  }
  a::after,
  a.active::after {
    opacity: 1;
  }
`;

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .site-navigation {
    display: flex;
    align-items: center;

    .desktop-nav {
      min-width: max-content;
      overflow: hidden;
    }
    ${LinkCss}

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

  @media (max-width: 576px) {
    .site-logo {
      margin-right: 10px;
    }
    .desktop-nav {
      display: none;
    }
    .mobile-nav {
      cursor: pointer;
    }
  }
  @media (min-width: 576px) {
    .mobile-nav {
      display: none;
    }
  }
`;
