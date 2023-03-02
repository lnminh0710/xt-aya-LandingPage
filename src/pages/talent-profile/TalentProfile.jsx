import styled from 'styled-components';
import { TalentAbout } from './about';
import { TalentAYA } from './aya';
import { TalentBanner } from './banner';
import { TalentCredit } from './credit';
import { TalentFollow } from './follow';
import { TalentInformation } from './information';

const Content = styled.div`
  margin: -80px auto 50px;
  max-width: min(calc(100vw - 14px), 1037px);
  display: grid;
  grid-template-columns: 306px 1fr;
  grid-gap: 22px;
`;

const TalentActions = styled.div``;

const TalentProfile = ({ data }) => {
  return (
    <>
      <TalentBanner banner={data.banner} />
      <Content>
        <div>
          <TalentInformation data={data} />
        </div>
        <TalentActions>
          <TalentAbout data={data} />
          <TalentCredit data={data} />
          <TalentFollow data={data} />
          <TalentAYA data={data} />
        </TalentActions>
      </Content>
    </>
  );
};

export default TalentProfile;
