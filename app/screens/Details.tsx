import { Text, View } from "react-native";
import styles from "../themes/styles";

const Details = ({ route }) => {
  const { inscriptionNumber, metadata } = route.params;

  return (
    <View style={styles.detailsScreenContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{inscriptionNumber}</Text>
      </View>
    </View>
  );
};

export default Details;
