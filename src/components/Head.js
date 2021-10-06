import Head from "next/head";
import { useRouter } from "next/router";

const HeadTags = (props) => {
  const router = useRouter();
  const {
    title = "Ethereum, Solidity, Next.js by Yilmaz BINGOL",
    metaDescription = "Experienced software engineer and mathematician Yilmaz Bingol",
    canonicalPath,
  } = props;

  return (
    <Head>
      <title>{title}</title>
      {/* mobile devices by default takes the content from desktop and squueze it. But we want it to be responsive */}
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      {/* First line of result when somoene searches your page */}
      <meta name="description" key="description" content={metaDescription} />
      <meta name="title" key="title" content={title} />
      <meta property="og:title" key="og:title" content={title} />
      <meta property="og:locale" key="og:locale" content="en_US" />
      <meta charSet="utf-8" />
      {/*         ---------------------OPEN GRAPH SETTING-------------------------- */}
      <meta
        property="og:url"
        key="og:url"
        content={`${process.env.BASE_URL}${router.asPath}`}
      />
      <meta property="og:type" key="og:type" content="website" />
      <meta
        property="og:description"
        key="og:description"
        content={metaDescription}
      />
      <meta
        property="og:image"
        key="og:image"
        content={`${process.env.BASE_URL}/yilmaz.png`}
      />
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
      />
      {/* <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link> */}
      {/* **********************  PWA SETTINGS */}
      {/* <link rel="apple-touch-icon" href="/apple-icon.png"></link> */}
      <meta name="theme-color" content="#317EFB" />
      {/* <link rel="manifest" href="/manifest.json" /> */}
      <link
        href="https://fonts.googleapis.com/css2?family=Alice&family=Great+Vibes&family=Inconsolata&family=Indie+Flower&family=Lobster&family=Press+Start+2P&display=swap"
        rel="stylesheet"
      />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      {/* Using the canonical tag prevents problems caused by identical or "duplicate" content appearing on multiple URLs */}
      <link
        rel="canonical"
        href={`${process.env.BASE_URL}${
          canonicalPath ? canonicalPath : router.asPath
        }`}
      />
      {/* <script
        src="https://kit.fontawesome.com/fbadad80a0.js"
        crossOrigin="anonymous"
      ></script> */}
    </Head>
  );
};

export default HeadTags;
