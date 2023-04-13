import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import theme from './themes/theme'
import { useState } from 'react'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.dark,
    justifyContent: 'flex-start',
    paddingTop: '20%',
    paddingLeft: '5%',
    paddingRight: '5%'
  },
  titleContainer: {
    alignItems: 'center'
  },
  textContainer: {
    paddingTop: '10%'
  },
  text: {
    color: theme.colors.light,
    fontWeight: '600',
    fontSize: 20
  },
  inputContainer: {
    paddingTop: '5%'
  },
  input: {
    padding: '5%',
    backgroundColor: theme.colors.darkLight,
    color: theme.colors.light,
    fontWeight: '600'
  },
  buttonContainer: {
    paddingTop: '5%'
  },
  button: {
    padding: '6%',
    backgroundColor: theme.colors.blue,
    alignItems: 'center',
    borderRadius: 10
  }
})

export default function App() {
  const [address, onChangeAddress] = useState('')

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.text}>Ordinal Inscription Lookup</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Owner Bitcoin Address:</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize={'none'}
          style={styles.input}
          onChangeText={onChangeAddress}
          value={address}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => {}} style={styles.button}>
          <Text style={styles.text}>Look up</Text>
        </Pressable>
      </View>
    </View>
  )
}
