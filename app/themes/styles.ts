import { Dimensions, StyleSheet } from "react-native";

import theme from "../themes/theme";

const windowWidth = Dimensions.get("window").width;

function hexToRGBA(hex: string, opacity: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

const styles = StyleSheet.create({
  mainScreenContainer: {
    flex: 1,
    backgroundColor: theme.colors.dark,
    justifyContent: "flex-start",
    paddingTop: "20%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  detailsScreenContainer: {
    flex: 1,
    backgroundColor: theme.colors.dark,
    justifyContent: "flex-start",
    paddingTop: "2%",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingBottom: "5%",
  },
  scrollContainer: {
    flex: 1,
  },
  titleContainer: {
    alignItems: "center",
  },
  textContainer: {
    paddingTop: "10%",
  },
  valueContainer: {
    paddingTop: "4%",
  },
  textAttributeContainer: {
    paddingTop: "4%",
    paddingBottom: "2%",
  },
  attributeValueContainer: {
    padding: "4%",
    borderRadius: 8,
    backgroundColor: theme.colors.darkLight,
  },
  attributesTextContainer: {
    paddingTop: "15%",
  },
  borderBottom: {
    paddingBottom: "4%",
    borderBottomColor: theme.colors.darkLight,
    borderBottomWidth: 2,
  },
  text: {
    color: theme.colors.light,
    fontWeight: "600",
    fontSize: 20,
    paddingRight: "4%",
  },
  errorText: {
    color: theme.colors.red,
    fontWeight: "600",
    fontSize: 20,
  },
  subtitleText: {
    color: hexToRGBA(theme.colors.light, 0.7),
    fontWeight: "600",
    fontSize: 16,
  },
  valueText: {
    color: theme.colors.light,
    fontWeight: "600",
    fontSize: 18,
  },
  inputContainer: {
    paddingTop: "5%",
  },
  input: {
    padding: "5%",
    backgroundColor: theme.colors.darkLight,
    color: theme.colors.light,
    fontWeight: "600",
  },
  buttonContainer: {
    paddingTop: "5%",
  },
  buttonContainerLooking: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    padding: "6%",
    backgroundColor: theme.colors.blue,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonDisabled: {
    padding: "6%",
    backgroundColor: theme.colors.darkLight,
    alignItems: "center",
    borderRadius: 10,
  },
  ordinalsViewContainer: {
    flex: 1,
  },
  ordinalsErrorContainer: {
    flex: 1,
    paddingTop: "4%",
    paddingLeft: "2%",
  },
  ordinalsListContainer: {
    paddingTop: "5%",
    paddingLeft: "2%",
    paddingBottom: "10%",
  },
  ordinalItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: "12%",
  },
  ordinalsList: {
    paddingTop: "12%",
  },
  ordinalImageContainer: {
    flex: 1,
    backgroundColor: theme.colors.dark,
    alignItems: "center",
    justifyContent: "center",
  },
  ordinalImage: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.dark,
  },
});

export default styles;
