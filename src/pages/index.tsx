import Image from "next/future/image";

import { useKeenSlider } from "keen-slider/react";

import { HomeContainer, Product } from "../styles/pages/home";

import camiseta1 from "../assets/camisetas/1.png";
import camiseta2 from "../assets/camisetas/2.png";
import camiseta3 from "../assets/camisetas/3.png";

import "keen-slider/keen-slider.min.css";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import { GetServerSideProps } from "next";
import { GetStaticProps } from "next";
import Head from "next/head";
/* import { Handbag } from "phosphor-react";
import { useShoppingCart } from "use-shopping-cart"; */

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    sku: string;
    currency: string;
    defaultPriceId: string;
  }[];
}


export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(product => {
        return (
          <Product key={product.id} className="keen-slider__slide">
          <Image src={product.imageUrl} width={520} height={480} alt={""} />
  
          <footer>
            <strong>{product.name}</strong>
            <span>{product.price}</span>
          </footer>
        </Product>
        )
      })}
    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    console.log(response);
    return {
      id: product.id,
      sku: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / 100,
      currency: "BRL",
      defaultPriceId: price.id,
    };
  });


  return {
    props: {
      products,
    }
  }
}