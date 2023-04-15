import { ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";

import styles from "../themes/styles";

function truncateMiddle(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;

  const halfLength = Math.floor(maxLength / 2);
  const firstPart = text.substring(0, halfLength);
  const secondPart = text.substring(text.length - halfLength, text.length);

  return `${firstPart}...${secondPart}`;
}

const AttributeValue = ({ title, value }) => {
  return (
    <View>
      <View style={styles.textAttributeContainer}>
        <Text style={styles.subtitleText}>{title}</Text>
      </View>
      <View style={styles.attributeValueContainer}>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    </View>
  );
};

const Details = ({ route }) => {
  const { inscriptionNumber, metadata } = route.params;

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <View style={styles.detailsScreenContainer}>
      {!metadata["content type"].includes("text/plain") && (
        <View style={styles.ordinalImageContainer}>
          <Image
            style={styles.ordinalImage}
            source={{
              uri: `https://ordin.s3.amazonaws.com/inscriptions/${metadata.id}`,
            }}
            placeholder={blurhash}
            contentFit="contain"
            transition={1000}
          />
        </View>
      )}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.textContainer, styles.borderBottom]}>
          <Text style={styles.text}>{inscriptionNumber}</Text>
        </View>

        {metadata.id && (
          <View>
            <View style={styles.textContainer}>
              <Text style={styles.subtitleText}>Inscription ID</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>{metadata.id}</Text>
            </View>
          </View>
        )}

        {metadata.address && (
          <View>
            <View style={styles.textContainer}>
              <Text style={styles.subtitleText}>Owner Address</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>{metadata.address}</Text>
            </View>
          </View>
        )}

        <View style={styles.attributesTextContainer}>
          <Text style={styles.text}>Attributes</Text>
        </View>

        {metadata["output value"] && (
          <AttributeValue
            title="Output Value"
            value={metadata["output value"]}
          />
        )}

        {metadata["content type"] && (
          <AttributeValue
            title="Content Type"
            value={metadata["content type"]}
          />
        )}

        {metadata["content length"] && (
          <AttributeValue
            title="Content Length"
            value={metadata["content length"]}
          />
        )}

        {metadata.location && (
          <AttributeValue
            title="Location"
            value={truncateMiddle(metadata["location"], 20)}
          />
        )}

        {metadata["genesis transaction"] && (
          <AttributeValue
            title="Genesis Transaction"
            value={truncateMiddle(
              metadata["genesis transaction"].replace("/tx/", ""),
              20
            )}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Details;
