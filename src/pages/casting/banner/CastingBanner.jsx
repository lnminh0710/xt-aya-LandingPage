import { useMatchQuery } from 'components/hook';
import Image from 'next/image';
import styles from './CastingBanner.module.scss';

const Banner = () => {
  const match = useMatchQuery();
  return (
    <div className={styles.root}>
      <Image
        className={styles.banner__image}
        src='/images/casting/Banner.webp'
        width={match ? 390 : 1728}
        height={300}
        layout='responsive'
        objectFit='cover'
        alt='banner-talent'
      />
    </div>
  );
};

export default Banner;
