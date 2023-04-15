export type UnspentOutputs = {
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

export type AvailableOrdinal = {
  id: string;
};

export type Ordinal = {
  inscriptionNumber: string;
  metadata: {
    id: string;
    address: string;
    ["output value"]: string;
    preview: string;
    content: string;
    ["content length"]: string;
    ["content type"]: string;
    timestamp: string;
    ["genesis height"]: string;
    ["genesis fee"]: string;
    ["genesis transaction"]: string;
    location: string;
    output: string;
    offset: string;
  };
};
