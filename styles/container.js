import styled from "styled-components";

export const Container = styled.section`
  max-width: 1200px;
  padding: 30px;
  margin: 0rem auto;
  .section-tag {
    color: var(--color-mint);
    font-weight: bold;
    margin-bottom: 0;
  }
  .section-title {
    margin: 0;
    margin-bottom: 2rem;
    font-size: 3rem;
  }
  .page-title {
    font-size: 3rem;
  }
  @media (max-width: 576px) {
    margin: 0 auto;
    .section-title {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    .page-title {
      font-size: 2rem;
    }
  }
`;

export const PageContainer = styled(Container)`
  .page-date time {
    text-transform: uppercase;
  }
  .page-content {
    margin-top: 2rem;
    p {
      margin-bottom: 10px;
    }
    h1 {
      font-size: 2rem;
      margin: 2rem 0 1rem;
    }
    h2 {
      margin: 1rem 0 0.5rem;
    }
    ul,
    ol {
      margin-bottom: 1rem;
      padding-left: 1rem;
    }

    p code,
    pre code {
      padding: 10px;
      margin: 1rem 0;
      display: block;
      background: var(--color-light);
      white-space: pre-wrap;
      word-break: break-all;
    }
  }
`;
