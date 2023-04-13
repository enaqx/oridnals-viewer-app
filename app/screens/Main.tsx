import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../app/store";

import OrdinalsList from "../components/OrdinalsList";
import styles from "../themes/styles";
import { useGetUnspentOutputsByAddressQuery } from "../services/blockstream";
import {
  useCheckOrdinalInscriptionQuery,
  useGetOrdinalDetailsQuery,
} from "../services/xverse";
import {
  addOrdinal,
  clearOrdinals,
  addUnspentOutputsTxIds,
  countUnspentOutputsCheck,
  removeUnspentOutputsTxIds,
} from "../features/ordinalsSlice";

const testOrdinal = {
  id: "9a2315da257d6c1010157bec4fecb20472666055ed79cd7462c28cf15b298522i0",
  inscriptionNumber: "Inscription 402189",
  ownerAddress:
    "bc1pe6y27ey6gzh6p0j250kz23zra7xn89703pvmtzx239zzstg47j3s3vdvvs",
  outputValue: "8880",
  contentType: "image/webp",
  contentLength: "3468 bytes",
  location:
    "163d36edada94746d7688cd8136cd35c68195aced5086bf6224c69896d39871d:0:0",
  genesisTransaction:
    "/tx/9a2315da257d6c1010157bec4fecb20472666055ed79cd7462c28cf15b298522",
};

const Main = ({ navigation }) => {
  const { ordinals, unspentOutputTxIds, counterUnspentOutputsCheck } =
    useSelector((state: RootState) => state.ordinals);
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [performLookup, setPerformLookup] = useState(false);
  const [finishLookup, setFinishLookup] = useState(true);
  const [currentOrdinals, setCurrentOrdinals] = useState([]);
  const [currentOrdinal, setCurrentOrdinal] = useState("");
  const [currentUnspentOutputs, setCurrentUnspentOutputs] = useState([]);
  const [currentUnspentOutput, setCurrentUnspentOutput] = useState("");

  const { data: unspentOutputsData, error: unspentOutputsError } =
    useGetUnspentOutputsByAddressQuery(address, { skip: !performLookup });

  const {
    data: inscriptionCheckData,
    error: inscriptionCheckError,
    isSuccess,
  } = useCheckOrdinalInscriptionQuery(currentUnspentOutput, {
    skip: currentUnspentOutput === "",
  });

  const { data: ordinalDetailsData } = useGetOrdinalDetailsQuery(
    currentOrdinal,
    { skip: currentOrdinal === "" }
  );

  if (unspentOutputsData) {
    setPerformLookup(false);
    // setFinishLookup(false);
    setAddress("");
    const txIds = unspentOutputsData.map((tx) => tx.txid);
    setCurrentUnspentOutputs(txIds);
    // dispatch(addUnspentOutputsTxIds(txIds));
  }

  if (unspentOutputsError) {
    console.log(unspentOutputsError);
    setPerformLookup(false);
    setAddress("");
  }

  useEffect(() => {
    if (currentUnspentOutputs.length > 0) {
      const [currentUnspentOutput, ...remainUnspentOutputs] =
        currentUnspentOutputs;
      console.log(currentUnspentOutput);
      setCurrentUnspentOutputs(remainUnspentOutputs);
      setCurrentUnspentOutput(currentUnspentOutput);
    } else {
      setCurrentUnspentOutput("");
    }
  }, [currentUnspentOutputs]);

  useEffect(() => {
    if (inscriptionCheckData?.id) {
      setCurrentOrdinals([...currentOrdinals, inscriptionCheckData.id]);
    }
  }, [inscriptionCheckData]);

  if (inscriptionCheckData && inscriptionCheckData.id) {
    console.log("currentOrdinal", inscriptionCheckData.id);
    // setCurrentOrdinal(inscriptionCheckData.id);
    // dispatch(countUnspentOutputsCheck());
  }

  useEffect(() => {
    if (currentOrdinals.length > 0) {
      const [currentOrdinal, ...remainOrdinals] = currentOrdinals;
      setCurrentOrdinals(remainOrdinals);
      setCurrentOrdinal(currentOrdinal);
    } else {
      setCurrentOrdinal("");
    }
  }, [currentOrdinals]);

  useEffect(() => {
    if (ordinalDetailsData?.inscriptionNumber) {
      dispatch(addOrdinal(ordinalDetailsData));
    }
  }, [ordinalDetailsData]);

  // if (counterUnspentOutputsCheck == 1) {
  //   setFinishLookup(true);
  // }

  // if (ordinalDetailsData) {
  //   console.log("ordinalDetailsData", ordinalDetailsData);
  //   dispatch(addOrdinal(ordinalDetailsData));
  //   setCurrentOrdinal("");
  // }

  const handleLookup = () => {
    console.log("dispatch", address);
    if (address.length > 0) {
      dispatch(clearOrdinals());
      setPerformLookup(true);
    }
  };

  // console.log("currentUnspentOutputs", currentUnspentOutputs);
  console.log("ordinals", ordinals.length);
  // console.log("unspentOutputTxIds", unspentOutputTxIds);
  // console.log("unspentOutputTxIds.length", unspentOutputTxIds.length);
  // console.log("inscriptionCheckData", inscriptionCheckData);
  // console.log("counterUnspentOutputsCheck", counterUnspentOutputsCheck);

  return (
    <View style={styles.mainScreenContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.text}>Ordinal Inscription Lookup</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Owner Bitcoin Address:</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize={"none"}
          style={styles.input}
          onChangeText={setAddress}
          value={address}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleLookup} style={styles.button}>
          <Text style={styles.text}>Look up</Text>
        </Pressable>
      </View>
      <View>
        <OrdinalsList ordinals={ordinals} navigation={navigation} />
      </View>
    </View>
  );
};

export default Main;
