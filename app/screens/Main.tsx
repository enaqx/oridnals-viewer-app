import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";

import type { RootState } from "../../app/store";

import OrdinalsList from "../components/OrdinalsList";
import styles from "../themes/styles";
import { addOrdinal, clearOrdinals } from "../features/ordinalsSlice";
import { StatusBar } from "expo-status-bar";
import { AvailableOrdinal, Ordinal, UnspentOutputs } from "../types";

const Main = ({ navigation }) => {
  const { ordinals } = useSelector((state: RootState) => state.ordinals);
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [currentError, setCurrentError] = useState(null);

  /**
   * Get unspent outputs tx ids
   */
  const [lokupUnspentOutputs, setLokupUnspentOutputs] = useState(false);
  const [txIds, setTxIds] = useState([]);
  const {
    error: unspentOutputDataError,
    data: unspentOutputData,
    isFetching: isUnspentOutputFetching,
  } = useQuery({
    queryKey: ["unspentOutput"],
    queryFn: (): Promise<UnspentOutputs[]> =>
      axios
        .get(`https://blockstream.info/api/address/${address}/utxo`)
        .then((res) => res.data),
    enabled: lokupUnspentOutputs,
  });

  useEffect(() => {
    if (unspentOutputData) {
      setLokupUnspentOutputs(false);
      setAddress("");
      setTxIds(unspentOutputData.map((tx) => tx.txid));
    }
  }, [unspentOutputData]);

  useEffect(() => {
    if (unspentOutputDataError) {
      setLokupUnspentOutputs(false);
      setAddress("");
      setCurrentError("Failed to retrieve ordinals data");
    }
  }, [unspentOutputDataError]);

  /**
   * Get available ordinals
   */
  const availableOrdinals = useQueries({
    queries: txIds?.map((txId) => {
      return {
        queryKey: ["availableOrdinal", txId],
        queryFn: (): Promise<AvailableOrdinal> =>
          axios
            .get(`https://api.xverse.app/v1/ordinals/output/${txId}/0`)
            .then((res) => res.data),
        enabled: txIds.length > 0,
      };
    }),
  });

  const [currentOrdinals, setCurrentOrdinals] = useState([]);
  useEffect(() => {
    if (
      availableOrdinals.length > 0 &&
      availableOrdinals.map((d) => d.isFetched).every(Boolean)
    ) {
      setCurrentOrdinals(availableOrdinals.map((d) => d?.data?.id));
      setTxIds([]);
    }
  }, [availableOrdinals]);

  /**
   * Get ordinals details
   */
  const ordinalDetails = useQueries({
    queries: currentOrdinals?.map((ordinalId) => {
      return {
        queryKey: ["ordinal", ordinalId],
        queryFn: (): Promise<Ordinal> =>
          axios
            .get(`https://api.xverse.app/v1/ordinals/${ordinalId}`)
            .then((res) => res.data),
        enabled: currentOrdinals.length > 0,
      };
    }),
  });

  useEffect(() => {
    if (
      ordinalDetails.length > 0 &&
      ordinalDetails.map((d) => d.isFetched).every(Boolean)
    ) {
      ordinalDetails.map((d) => {
        dispatch(addOrdinal(d.data));
      });
      setCurrentOrdinals([]);
    }
  }, [ordinalDetails]);

  const clearLookupState = () => {
    dispatch(clearOrdinals());
  };

  const handleLookup = () => {
    if (address.length > 0) {
      clearLookupState();
      setLokupUnspentOutputs(true);
    }
  };

  const isDisabled = () => {
    return (
      isUnspentOutputFetching || txIds.length > 0 || currentOrdinals.length > 0
    );
  };

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
          onChangeText={(e) => {
            setAddress(e);
            setCurrentError(null);
          }}
          onSubmitEditing={handleLookup}
          value={address}
          editable={!isDisabled()}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handleLookup}
          style={isDisabled() ? styles.buttonDisabled : styles.button}
          disabled={isDisabled()}
        >
          {isDisabled() ? (
            <View style={styles.buttonContainerLooking}>
              <Text style={styles.text}>Looking up</Text>
              <ActivityIndicator />
            </View>
          ) : (
            <Text style={styles.text}>Look up</Text>
          )}
        </Pressable>
      </View>
      {unspentOutputDataError && (
        <View style={styles.ordinalsErrorContainer}>
          <Text style={styles.errorText}>{currentError}</Text>
        </View>
      )}
      <SafeAreaView style={styles.ordinalsViewContainer}>
        <OrdinalsList ordinals={ordinals} navigation={navigation} />
      </SafeAreaView>
      <StatusBar style="light" />
    </View>
  );
};

export default Main;
