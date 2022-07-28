import { menuMockup } from 'mockups/menu';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

const Item = styled.a`
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  /* identical to box height, or 162% */

  /* Grey/01 */

  color: #fff;
  cursor: pointer;
`;

const MenuItem = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

const MenuMobile = ({ open, setOpen }) => {
  const { t } = useTranslation('common');
  return (
    <Modal
      scrollable={false}
      show={open}
      backdropClassName={'backdrop-menu'}
      onHide={setOpen}
      bsPrefix='modal right'
      contentClassName={'content-menu'}
      dialogClassName={'modal-menu'}
    >
      {menuMockup.map((_menu, index) => (
        <MenuItem key={index}>
          <Link href={_menu.link}>
            <Item>{t(_menu.name)}</Item>
          </Link>
        </MenuItem>
      ))}
    </Modal>
  );
};

export default MenuMobile;
