import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import CopyKitt from "@/components/copykitt";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    
    <div>
      <Head>
        <title>CopuKitt Tutorial | AI Generated Marketing</title>
        <meta
          name="desciprtion"
          content="Generate branding snippets for your product."
        />
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <CopyKitt />
      
    </div>
  );
};
