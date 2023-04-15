import { View, Text, FlatList, Pressable } from "react-native";
import Arrow from "../assets/arrow.svg";

import styles from "../themes/styles";

const OrdinalItem = ({ inscription, navigation }) => (
  <Pressable
    style={styles.ordinalItem}
    onPress={() => navigation.navigate("Details", inscription)}
  >
    <Text style={styles.text}>{inscription.inscriptionNumber}</Text>
    <View>
      <Arrow width={20} height={20} />
    </View>
  </Pressable>
);

const OrdinalsList = ({ ordinals, navigation }) => {
  return (
    <View style={styles.ordinalsListContainer}>
      {ordinals.length ? <Text style={styles.text}>Results</Text> : <></>}
      <View style={styles.ordinalsList}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={ordinals}
          renderItem={({ item }) => (
            <OrdinalItem inscription={item} navigation={navigation} />
          )}
          keyExtractor={(_, idx) => idx.toString()}
        />
      </View>
    </View>
  );
};

export default OrdinalsList;
