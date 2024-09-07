import styled from "styled-components";
import Search from 'antd/lib/input/Search';

export const LangchainBlockSection = styled("section")`
  position: relative;
  padding: 7.5rem 0 3rem;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media screen and (max-width: 1024px) {
    padding: 5.5rem 0 3rem;
  }
`;

export const BotSearch = styled(Search)`
  .ant-btn {
    background: #18216d;
  }
`
