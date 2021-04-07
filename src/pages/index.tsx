import { GetStaticProps } from 'next';

import Head from 'next/head';
import Link from 'next/link';
import { FiCalendar } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Post | Blog</title>
      </Head>

      <main className={commonStyles.container}>
        <div className={styles.postsList}>
          <Link href="/">
            <a>
              <strong>Como utilizar Hooks</strong>
              <p>Pensando em sincronização em vez de ciclos de vida.</p>
              <section>
                <div>
                  <FiCalendar />
                  <time>15 Mar 2021</time>
                </div>
                <div>
                  <FiUser />
                  <span>Joseph Oliveira</span>
                </div>
              </section>
            </a>
          </Link>
          <Link href="/">
            <a>
              <strong>Como utilizar Hooks</strong>
              <p>Pensando em sincronização em vez de ciclos de vida.</p>
              <section>
                <div>
                  <FiCalendar />
                  <time>15 Mar 2021</time>
                </div>
                <div>
                  <FiUser />
                  <span>Joseph Oliveira</span>
                </div>
              </section>
            </a>
          </Link>
          <Link href="/">
            <a>
              <strong>Como utilizar Hooks</strong>
              <p>Pensando em sincronização em vez de ciclos de vida.</p>
              <section>
                <div>
                  <FiCalendar />
                  <time>15 Mar 2021</time>
                </div>
                <div>
                  <FiUser />
                  <span>Joseph Oliveira</span>
                </div>
              </section>
            </a>
          </Link>
        </div>

        <button type="button" className={styles.more}>
          Carregar mais posts
        </button>
      </main>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
