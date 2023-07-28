import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import type { Link } from '@/lib/types';
import styles from './page.module.scss';

export function Page({ children, links = [] as Link[], text = '', ...props }) {
    return (
        <div className={styles.page} {...props}>
            <Header />
            {children}
            <Footer links={links} text={text} />
        </div>
    );
}
