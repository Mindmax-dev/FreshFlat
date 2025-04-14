import styles from './page.module.css';
import Image from 'next/image';
import freshFlatLogo from '@/utils/images/freshFlatLogo.png';

export default async function ProtectedLayout({ children }) {
  return (
    <div className={styles.centerContent}>
      <div className={styles.logo}>
        <Image
          src={freshFlatLogo}
          alt="Description of image"
          width={125}
          height={125}
        />
      </div>
      {children}
    </div>
  );
}
