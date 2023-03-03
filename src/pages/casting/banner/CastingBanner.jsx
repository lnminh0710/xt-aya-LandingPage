import { useMatchQuery } from 'components/hook';
import Image from 'next/image';
import styles from './CastingBanner.module.scss';

const Banner = () => {
  const match = useMatchQuery();
  if (match)
    return (
      <div className={styles.root}>
        <Image
          className={styles.banner__image}
          src='/images/casting/Banner-mobile.webp'
          width={390}
          height={300}
          layout='responsive'
          objectFit='cover'
          alt='banner-talent'
        />
      </div>
    );
  return (
    <div className={styles.root}>
      <Image
        className={styles.banner__image}
        src='/images/casting/Banner.webp'
        width={1728}
        height={300}
        layout='responsive'
        objectFit='cover'
        alt='banner-talent'
      />
    </div>
  );
};

export default Banner;
