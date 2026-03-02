import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";

const NEXT_PUBLIC_PORT = process.env.NEXT_PUBLIC_PORT;

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

const createApolloClient = () => {
  const isSsr = typeof window === "undefined";
  const uri = isSsr
    ? `http://localhost:${NEXT_PUBLIC_PORT}/graphql`
    : "/graphql";

  const httpLink = new HttpLink({
    uri, // Server URL (must be absolute)
    credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
    fetch,
  });

  return new ApolloClient({
    ssrMode: isSsr,
    link: httpLink,

    cache: new InMemoryCache(),
  });
};

export const useApollo = () => {
  const client = createApolloClient();

  return client;
};
