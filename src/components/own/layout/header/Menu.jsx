import { menuMockup } from 'mockups/menu';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ total }) => total}, max-content);
  grid-column-gap: 28px;
  align-items: center;
  justify-content: center;
  height: 100%;

  @media only screen and (max-width: 900px) {
    grid-gap: 12px;
  }
`;

const Item = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  /* identical to box height, or 162% */

  /* Grey/01 */

  color: #2c2b34;
  height: 100%;
  display: flex;
  align-items: center;
  /* border-bottom: 2px solid; */
  box-shadow: ${({ active }) => (active ? 'inset 0px -3px 0px #9454fc' : '')};
  height: 40px;
  a:hover {
    color: #2c2b34;
  }
`;

const Menu = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  return (
    <Root total={menuMockup.length}>
      {menuMockup.map((_menu, index) => (
        <Item key={index} active={router?.pathname === _menu.link}>
          <Link href={_menu.link} passHref>
            <a>{t(_menu.name)}</a>
          </Link>
        </Item>
      ))}
    </Root>
  );
};

export default Menu;
