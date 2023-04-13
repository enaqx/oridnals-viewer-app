import { View, Text, FlatList } from 'react-native'
import Arrow from '../assets/arrow.svg'

import styles from '../themes/styles'

type OrdinalItemProps = {
  inscriptionNumber: string
}

const OrdinalItem = ({ inscriptionNumber }: OrdinalItemProps) => (
  <View style={styles.ordinalItem}>
    <Text style={styles.text}>{inscriptionNumber}</Text>
    <View>
      <Arrow width={20} height={20} />
    </View>
  </View>
)

const OrdinalsList = ({ ordinals }) => {
  return (
    <View style={styles.ordinalsListContainer}>
      {ordinals.length ? <Text style={styles.text}>Results</Text> : <></>}
      <View style={styles.ordinalsList}>
        <FlatList
          data={ordinals}
          renderItem={({ item }) => (
            <OrdinalItem inscriptionNumber={item.inscriptionNumber} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  )
}

export default OrdinalsList
