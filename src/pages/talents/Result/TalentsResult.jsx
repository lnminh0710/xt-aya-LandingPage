import { StarIcon } from 'assets/svg';
import { ImageLazyLoad } from 'components/own';
import { talentDataMockup } from 'mockups/talents';
import Link from 'next/link';
import { parseKNumber } from 'utils/convert';
import styles from './TalentsResult.module.scss';

const renderStar = (star) => (
  <div className={styles['user__star-contained']}>
    <StarIcon color={star >= 1 ? '#FFB951' : '#2C2B34'} />
    <StarIcon color={star >= 2 ? '#FFB951' : '#2C2B34'} />
    <StarIcon color={star >= 3 ? '#FFB951' : '#2C2B34'} />
    <StarIcon color={star >= 4 ? '#FFB951' : '#2C2B34'} />
    <StarIcon color={star === 5 ? '#FFB951' : '#2C2B34'} />
  </div>
);

const TalentsResult = () => {
  return (
    <div className={styles.root}>
      {talentDataMockup.map((data, index) => (
        <Link key={index} href={'/talents/' + data.name}>
          <div className={styles.user}>
            <div className={styles.user__avatar}>
              <ImageLazyLoad
                src={data.avatar}
                width={306}
                height={360}
                alt={data.name}
              />
            </div>
            <div className={styles.user__name}>
              <span>{data.name}</span>
            </div>
            <div className={styles.user__gender}>
              {data.gender} • {data.country}
            </div>
            <div className={styles.user__star}>
              {renderStar(data.rating)} {data.rating}/5
            </div>
            <div className={styles.user__follower}>
              {parseKNumber(data.follower)} Followers
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TalentsResult;
