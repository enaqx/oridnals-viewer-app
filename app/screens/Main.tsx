import { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '../../app/store'

import OrdinalsList from '../components/OrdinalsList'
import styles from '../themes/styles'
import { addOrdinal } from '../features/ordinalsSlice'

const testOrdinal = {
  id: '9a2315da257d6c1010157bec4fecb20472666055ed79cd7462c28cf15b298522i0',
  inscriptionNumber: 'Inscription 402189',
  ownerAddress:
    'bc1pe6y27ey6gzh6p0j250kz23zra7xn89703pvmtzx239zzstg47j3s3vdvvs',
  outputValue: '8880',
  contentType: 'image/webp',
  contentLength: '3468 bytes',
  location:
    '163d36edada94746d7688cd8136cd35c68195aced5086bf6224c69896d39871d:0:0',
  genesisTransaction:
    '/tx/9a2315da257d6c1010157bec4fecb20472666055ed79cd7462c28cf15b298522'
}

const Main = () => {
  const { ordinals } = useSelector((state: RootState) => state.ordinals)
  const dispatch = useDispatch()
  const [address, onChangeAddress] = useState('')

  const handleLookup = () => {
    console.log('dispatch')
    dispatch(addOrdinal(testOrdinal))
  }

  console.log('ordinals', ordinals)

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
          autoCapitalize={'none'}
          style={styles.input}
          onChangeText={onChangeAddress}
          value={address}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleLookup} style={styles.button}>
          <Text style={styles.text}>Look up</Text>
        </Pressable>
      </View>
      <View>
        <OrdinalsList ordinals={ordinals}/>
      </View>
    </View>
  )
}

export default Main
