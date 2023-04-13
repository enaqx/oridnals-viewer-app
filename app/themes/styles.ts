import { StyleSheet } from "react-native";

import theme from "../themes/theme";

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
    paddingTop: "20%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  titleContainer: {
    alignItems: "center",
  },
  textContainer: {
    paddingTop: "10%",
  },
  text: {
    color: theme.colors.light,
    fontWeight: "600",
    fontSize: 20,
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
  button: {
    padding: "6%",
    backgroundColor: theme.colors.blue,
    alignItems: "center",
    borderRadius: 10,
  },
  ordinalsListContainer: {
    paddingTop: "5%",
    paddingLeft: "2%",
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
});

export default styles;
