import styled from 'styled-components';
import { TalentBanner } from './Banner';
import { TalentsFilter } from './Filter';
import { TalentsResult } from './Result';

const MoreButton = styled.div`
  width: 136px;
  height: 48px;

  /* Primary/02 */

  background: #674f82;
  border-radius: 45px;
  margin: auto;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 600;
  font-size: 16px;
  line-height: 26px;

  /* White / 01 */

  color: #ffffff;

  cursor: pointer;
`;

const Talents = () => {
  return (
    <>
      <TalentBanner />
      <TalentsFilter />
      <TalentsResult />
      <MoreButton>More (99+)</MoreButton>
    </>
  );
};

export default Talents;
