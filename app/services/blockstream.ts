import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type UnspentOutputs = {
  txid: string;
  vout: number;
  status: {
    confirmed: boolean;
    block_height: number;
    block_hash: string;
    block_time: number;
  };
  value: number;
};

export const blockstreamApi = createApi({
  reducerPath: "blockstreamApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://blockstream.info/api/" }),
  endpoints: (builder) => ({
    getUnspentOutputsByAddress: builder.query<UnspentOutputs[], string>({
      query: (address) => `address/${address}/utxo`,
    }),
  }),
});

export const { useGetUnspentOutputsByAddressQuery } = blockstreamApi;
