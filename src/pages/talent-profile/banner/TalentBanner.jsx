import { MagnifyingIcon } from 'assets/svg';
import { useMatchQuery } from 'components/hook';
import { ImageLazyLoad } from 'components/own';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import styles from './TalentBanner.module.scss';

const Banner = ({ banner = '/images/talents/banner.webp' }) => {
  const match = useMatchQuery();
  return (
    <div className={styles.root}>
      <Image
        className={styles.banner__image}
        src={banner}
        width={match ? 390 : 1728}
        height={300}
        layout='responsive'
        objectFit='cover'
        alt='banner'
      />
    </div>
  );
};

export default Banner;
