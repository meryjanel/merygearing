import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
}) => {
  locale = locale ?? (query.locale as string);

  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};
