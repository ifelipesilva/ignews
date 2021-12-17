import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscriveButton } from '../components/SubscriveButton';
import { stripe } from '../services/stripe';

import Image from 'next/image';

import styles from './home.module.scss';

//client-side
//server-side
//static site generation

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Ig.News</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Welcome</span>
          <h1>
            News about the <span>React</span>.
          </h1>

          <p>
            Get acess to all the publications
            <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscriveButton priceId={product.priceId} />
        </section>

        <Image
          src="/images/avatar.svg"
          alt="girl coding"
          width={336}
          height={521}
        />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1K7JycBEj3Nqxkmq0ZQTrdV7');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },

    revalidate: 60 * 60 * 24, //24 hours
  };
};
