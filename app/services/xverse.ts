import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Ordinal } from "../types";

type InscriptionCheck = {
  id: string;
};

export const xverseApi = createApi({
  reducerPath: "xverseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.xverse.app/v1/" }),
  endpoints: (builder) => ({
    checkOrdinalInscription: builder.query<InscriptionCheck, string>({
      query: (txid) => `ordinals/output/${txid}/0`,
    }),

    getOrdinalDetails: builder.query<Ordinal, string>({
      query: (txid) => `ordinals/${txid}`,
    }),
  }),
});

export const { useCheckOrdinalInscriptionQuery, useGetOrdinalDetailsQuery } =
  xverseApi;
