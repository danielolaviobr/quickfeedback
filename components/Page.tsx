import React from "react";
import { NextSeo } from "next-seo";

interface PageProps {
  name: string;
  path: string;
}

const Page: React.FC<PageProps> = ({ name, path, children }) => {
  const title = `Quick Feedback – ${name}`;
  const url = `https://quickfeedback.vercel.app${path}`;

  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title
        }}
      />
      {children}
    </>
  );
};

export default Page;
