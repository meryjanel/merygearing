import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
};

export type BiomeObject = {
  __typename?: 'BiomeObject';
  dlc?: Maybe<Scalars['String']['output']>;
  effects?: Maybe<Array<Scalars['String']['output']>>;
  fertileSoil?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  nodes?: Maybe<Array<Scalars['String']['output']>>;
  special?: Maybe<Scalars['JSON']['output']>;
  trees?: Maybe<Array<Scalars['String']['output']>>;
};

export type BonusObject = {
  __typename?: 'BonusObject';
  bonusPercent?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

export type BuildingConstructionObject = {
  __typename?: 'BuildingConstructionObject';
  material?: Maybe<Scalars['String']['output']>;
  num?: Maybe<Scalars['Float']['output']>;
};

export type BuildingObject = {
  __typename?: 'BuildingObject';
  allIngredients?: Maybe<Array<Scalars['String']['output']>>;
  allProducts?: Maybe<Array<Scalars['String']['output']>>;
  buildTime?: Maybe<Scalars['Float']['output']>;
  buildingIngredients?: Maybe<Array<BuildingConstructionObject>>;
  buildingSize?: Maybe<Scalars['String']['output']>;
  buildingType?: Maybe<Scalars['String']['output']>;
  cityScore?: Maybe<Scalars['Float']['output']>;
  comfort?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['String']['output'];
  logic?: Maybe<Scalars['JSON']['output']>;
  moveable: Scalars['Boolean']['output'];
  proficiency?: Maybe<Array<Scalars['String']['output']>>;
  rainpunk?: Maybe<Scalars['String']['output']>;
  special?: Maybe<Scalars['JSON']['output']>;
  storage?: Maybe<Scalars['Float']['output']>;
  workers?: Maybe<Scalars['Float']['output']>;
};

export type BuildingsProductionObject = {
  __typename?: 'BuildingsProductionObject';
  buildingType?: Maybe<Scalars['String']['output']>;
  grade?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  allBiomeList?: Maybe<Array<BiomeObject>>;
  allBuildingList?: Maybe<Array<BuildingObject>>;
  allNodeList?: Maybe<Array<NodeObject>>;
  allResourceList?: Maybe<Array<ResourceObject>>;
  nodeList?: Maybe<Array<NodeObject>>;
};

export type NodeObject = {
  __typename?: 'NodeObject';
  allResources?: Maybe<Array<Scalars['String']['output']>>;
  biome?: Maybe<Array<Scalars['String']['output']>>;
  bonus?: Maybe<Array<BonusObject>>;
  camp?: Maybe<Array<Scalars['String']['output']>>;
  charges: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  primary: Scalars['String']['output'];
  size?: Maybe<Scalars['String']['output']>;
  special?: Maybe<Scalars['JSON']['output']>;
};

export type Query = {
  __typename?: 'Query';
  nodeListQuery?: Maybe<Array<NodeObject>>;
};

export type ResourceObject = {
  __typename?: 'ResourceObject';
  id: Scalars['String']['output'];
  price?: Maybe<Scalars['JSON']['output']>;
  productionBuildings?: Maybe<Array<BuildingsProductionObject>>;
  special?: Maybe<Scalars['JSON']['output']>;
  speciesPreference?: Maybe<Array<Scalars['String']['output']>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type AllBiomeListMutationVariables = Exact<{ [key: string]: never; }>;


export type AllBiomeListMutation = { __typename?: 'Mutation', allBiomeList?: Array<{ __typename?: 'BiomeObject', id?: string | null, dlc?: string | null, fertileSoil?: string | null, trees?: Array<string> | null, nodes?: Array<string> | null, effects?: Array<string> | null, special?: any | null }> | null };

export type AllBuildingListMutationVariables = Exact<{ [key: string]: never; }>;


export type AllBuildingListMutation = { __typename?: 'Mutation', allBuildingList?: Array<{ __typename?: 'BuildingObject', id: string, buildingType?: string | null, workers?: number | null, storage?: number | null, cityScore?: number | null, buildTime?: number | null, buildingSize?: string | null, proficiency?: Array<string> | null, comfort?: Array<string> | null, logic?: any | null, moveable: boolean, rainpunk?: string | null, allIngredients?: Array<string> | null, allProducts?: Array<string> | null, special?: any | null, buildingIngredients?: Array<{ __typename?: 'BuildingConstructionObject', material?: string | null, num?: number | null }> | null }> | null };

export type AllNodeListMutationVariables = Exact<{ [key: string]: never; }>;


export type AllNodeListMutation = { __typename?: 'Mutation', allNodeList?: Array<{ __typename?: 'NodeObject', id: string, size?: string | null, charges: number, primary: string, camp?: Array<string> | null, biome?: Array<string> | null, allResources?: Array<string> | null, special?: any | null, bonus?: Array<{ __typename?: 'BonusObject', id?: string | null, bonusPercent?: number | null }> | null }> | null };

export type AllResourceListMutationVariables = Exact<{ [key: string]: never; }>;


export type AllResourceListMutation = { __typename?: 'Mutation', allResourceList?: Array<{ __typename?: 'ResourceObject', id: string, type?: string | null, price?: any | null, speciesPreference?: Array<string> | null, special?: any | null, productionBuildings?: Array<{ __typename?: 'BuildingsProductionObject', id?: string | null, grade?: number | null, buildingType?: string | null }> | null }> | null };


export const AllBiomeListDocument = gql`
    mutation AllBiomeList {
  allBiomeList {
    id
    dlc
    fertileSoil
    trees
    nodes
    effects
    special
  }
}
    `;
export type AllBiomeListMutationFn = ApolloReactCommon.MutationFunction<AllBiomeListMutation, AllBiomeListMutationVariables>;

/**
 * __useAllBiomeListMutation__
 *
 * To run a mutation, you first call `useAllBiomeListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAllBiomeListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [allBiomeListMutation, { data, loading, error }] = useAllBiomeListMutation({
 *   variables: {
 *   },
 * });
 */
export function useAllBiomeListMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AllBiomeListMutation, AllBiomeListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AllBiomeListMutation, AllBiomeListMutationVariables>(AllBiomeListDocument, options);
      }
export type AllBiomeListMutationHookResult = ReturnType<typeof useAllBiomeListMutation>;
export type AllBiomeListMutationResult = ApolloReactCommon.MutationResult<AllBiomeListMutation>;
export type AllBiomeListMutationOptions = ApolloReactCommon.BaseMutationOptions<AllBiomeListMutation, AllBiomeListMutationVariables>;
export const AllBuildingListDocument = gql`
    mutation AllBuildingList {
  allBuildingList {
    id
    buildingType
    workers
    storage
    buildingIngredients {
      material
      num
    }
    cityScore
    buildTime
    buildingSize
    proficiency
    comfort
    logic
    moveable
    rainpunk
    allIngredients
    allProducts
    special
  }
}
    `;
export type AllBuildingListMutationFn = ApolloReactCommon.MutationFunction<AllBuildingListMutation, AllBuildingListMutationVariables>;

/**
 * __useAllBuildingListMutation__
 *
 * To run a mutation, you first call `useAllBuildingListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAllBuildingListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [allBuildingListMutation, { data, loading, error }] = useAllBuildingListMutation({
 *   variables: {
 *   },
 * });
 */
export function useAllBuildingListMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AllBuildingListMutation, AllBuildingListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AllBuildingListMutation, AllBuildingListMutationVariables>(AllBuildingListDocument, options);
      }
export type AllBuildingListMutationHookResult = ReturnType<typeof useAllBuildingListMutation>;
export type AllBuildingListMutationResult = ApolloReactCommon.MutationResult<AllBuildingListMutation>;
export type AllBuildingListMutationOptions = ApolloReactCommon.BaseMutationOptions<AllBuildingListMutation, AllBuildingListMutationVariables>;
export const AllNodeListDocument = gql`
    mutation AllNodeList {
  allNodeList {
    id
    size
    charges
    primary
    camp
    biome
    bonus {
      id
      bonusPercent
    }
    allResources
    special
  }
}
    `;
export type AllNodeListMutationFn = ApolloReactCommon.MutationFunction<AllNodeListMutation, AllNodeListMutationVariables>;

/**
 * __useAllNodeListMutation__
 *
 * To run a mutation, you first call `useAllNodeListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAllNodeListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [allNodeListMutation, { data, loading, error }] = useAllNodeListMutation({
 *   variables: {
 *   },
 * });
 */
export function useAllNodeListMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AllNodeListMutation, AllNodeListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AllNodeListMutation, AllNodeListMutationVariables>(AllNodeListDocument, options);
      }
export type AllNodeListMutationHookResult = ReturnType<typeof useAllNodeListMutation>;
export type AllNodeListMutationResult = ApolloReactCommon.MutationResult<AllNodeListMutation>;
export type AllNodeListMutationOptions = ApolloReactCommon.BaseMutationOptions<AllNodeListMutation, AllNodeListMutationVariables>;
export const AllResourceListDocument = gql`
    mutation AllResourceList {
  allResourceList {
    id
    type
    price
    speciesPreference
    productionBuildings {
      id
      grade
      buildingType
    }
    special
  }
}
    `;
export type AllResourceListMutationFn = ApolloReactCommon.MutationFunction<AllResourceListMutation, AllResourceListMutationVariables>;

/**
 * __useAllResourceListMutation__
 *
 * To run a mutation, you first call `useAllResourceListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAllResourceListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [allResourceListMutation, { data, loading, error }] = useAllResourceListMutation({
 *   variables: {
 *   },
 * });
 */
export function useAllResourceListMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AllResourceListMutation, AllResourceListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AllResourceListMutation, AllResourceListMutationVariables>(AllResourceListDocument, options);
      }
export type AllResourceListMutationHookResult = ReturnType<typeof useAllResourceListMutation>;
export type AllResourceListMutationResult = ApolloReactCommon.MutationResult<AllResourceListMutation>;
export type AllResourceListMutationOptions = ApolloReactCommon.BaseMutationOptions<AllResourceListMutation, AllResourceListMutationVariables>;