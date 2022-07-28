import { DoubleHeartIcon } from 'assets/svg';
import Link from 'next/link';
import styles from './TalentAYA.module.scss';

const TalentAYA = ({ data = {} }) => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>AYA</div>
      <div className={styles.sponsor}>
        <div>
          <div className={styles.benefit}>Become a fan to</div>
          <div className={styles['join-button']}>Join now</div>
        </div>
        <div>
          <div className={styles['total-post']}>99</div>
          <div className={styles['desc-post']}>Unlock 99 exclusive posts</div>
        </div>
        <div>
          <DoubleHeartIcon />
          <div className='mb-2'></div>
          <div className={styles['desc-post']}>Become a part of AYA</div>
        </div>
      </div>
      {data?.post?.map((_p, index) => (
        <div key={index} className={styles.post}>
          <div className={styles.post__image}>
            <div className={styles['post__image-title']}>
              Unlock this post by becoming a Fan
            </div>
            <div className={styles['post__image-button']}>Join now</div>
          </div>
          <div className={styles.post__date}>{_p.createdDate}</div>
          <div className={styles.post__title}>{_p.title}</div>
          <div className={styles.post__subscribe}>Subscribe</div>
          <div className={styles.post__summary}>
            <div>{`${_p.totalCommend} Comments`}</div>
            <div>{`${_p.totalLikes} Likes`}</div>
          </div>
        </div>
      ))}
      <Link href={'/aya/' + data.name} passHref>
        <a>
          <div className={styles.explore}>Explore AYA</div>
        </a>
      </Link>
    </div>
  );
};

export default TalentAYA;
