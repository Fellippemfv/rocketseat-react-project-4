import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/future/image";
import { useRouter } from "next/router";
import Head from "next/head";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    defaultPriceId: string;
    currency: string;
  };
}

export default function Product({ product }: ProductProps) {
  function handleBuyProduct() {
    console.log(product.defaultPriceId);
  }
/*   const { addItem, cartDetails } = useShoppingCart();
  console.log(cartDetails) */


  if (product) {
    return (
      <>
        <Head>
          <title>{product.name} | Ignite Shop </title>
        </Head>
        <ProductContainer>
          <ImageContainer>
            <Image src={product.imageUrl} width={520} height={480} alt="" />
          </ImageContainer>

          <ProductDetails>
            <h1>{product.name}</h1>
            <span>{new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.price / 100)}</span>

            <p>{product.description}</p>

            <button onClick={handleBuyProduct} /* onClick={() => addItem(product)} */>Colocar na sacola</button>
          </ProductDetails>
        </ProductContainer>
      </>
    );
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_MOvHDjjhS0CWqS" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        description: product.description,
        defaultPriceId: price.id,
        currency: price.currency,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hora
  };
};

/* function useShoppingCart(): { addItem: any; cartDetails: any; } {
    throw new Error("Function not implemented.");
} */
