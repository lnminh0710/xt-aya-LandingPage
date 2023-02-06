import { menuMockup } from 'mockups/menu';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ total }) => total}, max-content);
  grid-column-gap: 24px;
  align-items: center;
  justify-content: center;
  height: 100%;

  @media only screen and (max-width: 900px) {
    grid-gap: 12px;
  }
`;

const Item = styled.a`
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  /* identical to box height, or 162% */

  /* Grey/01 */

  color: #2c2b34;
  height: 100%;
  display: flex;
  align-items: center;
  border-bottom: ${({ active }) =>
    active ? '4px solid #9454fc' : '4px solid transparent'};
  height: 40px;
  &:hover {
    color: #2c2b34;
  }
`;

const Menu = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  return (
    <Root total={menuMockup.length}>
      {menuMockup.map((_menu, index) => (
        <Link key={index} href={_menu.link} passHref>
          <Item active={router?.pathname === _menu.link}>{t(_menu.name)}</Item>
        </Link>
      ))}
    </Root>
  );
};

export default Menu;
