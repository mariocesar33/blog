import { GetStaticProps } from 'next';

import Head from 'next/head';
import Link from 'next/link';
import Prismic from '@prismicio/client';
import { FiCalendar } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';
import { useState } from 'react';
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

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const formattedPost = postsPagination.results.map(post => {
    return {
      ...post,
      first_publication_date: new Date(
        post.first_publication_date
      ).toLocaleDateString('pt', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    };
  });

  const [posts, setPosts] = useState<Post[]>(formattedPost);

  // console.log(posts);

  return (
    <>
      <Head>
        <title>Post | Blog</title>
      </Head>

      <main className={commonStyles.container}>
        <div className={styles.postsList}>
          {posts.map(post => {
            return (
              <Link href={`/post/${post.uid}`} key={post.uid}>
                <a>
                  <strong>{post.data.title}</strong>
                  <p>{post.data.subtitle}</p>
                  <section>
                    <div>
                      <FiCalendar />
                      <time>{post.first_publication_date}</time>
                    </div>
                    <div>
                      <FiUser />
                      <span>{post.data.author}</span>
                    </div>
                  </section>
                </a>
              </Link>
            );
          })}
        </div>

        <button type="button" className={styles.more}>
          Carregar mais posts
        </button>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      pageSize: 100,
    }
  );
  // console.log(postsResponse);
  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  const postsPagination = {
    next_page: postsResponse.next_page,
    results: posts,
  };

  console.log(JSON.stringify(postsPagination, null, 2));

  return {
    props: {
      postsPagination,
    },
  };
};
