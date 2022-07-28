import { ArrowCircleTurnRight, PhoneIcon, StarIcon } from 'assets/svg';
import { ImageLazyLoad } from 'components/own';
import { parseKNumber } from 'utils/convert';
import styles from './TalentInformation.module.scss';

const TalentInformation = ({ data = {} }) => {
  return (
    <div className={styles.root}>
      <div className={styles.avatar}>
        <ImageLazyLoad
          src={data.avatar}
          alt={data.name}
          width={306}
          height={344}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{data.name}</div>
        <div className={styles.job}>{data.job}</div>
        <div className={styles.gender}>{data.gender}</div>
        <div className={styles.social}>
          <div className={styles.social__item}>
            <div className={styles['social__item-value']}>
              {parseKNumber(data.follower)}
            </div>
            <div className={styles['social__item-label']}>Followers</div>
          </div>
          <div className={styles.social__item}>
            <div className={styles['social__item-value']}>
              {' '}
              {parseKNumber(data.following)}
            </div>
            <div className={styles['social__item-label']}>Following</div>
          </div>
          <div className={styles.social__item}>
            <div className={styles['social__item-value']}>{data.rating}</div>
            <div className={styles['social__item-label']}>
              Rating <StarIcon />
            </div>
          </div>
        </div>
        <div className={styles['following-button']}>Following</div>
        <div className={styles.action}>
          <div className={styles['inquiry-button']}>
            <PhoneIcon /> Inquiry
          </div>
          <div>
            <ArrowCircleTurnRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentInformation;
