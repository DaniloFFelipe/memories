import { FlashList } from '@shopify/flash-list'
import { Memory as MemoryModel } from '../../../core/models/memory'
import { Memory } from './memory-card'
import { useMemories } from '../hooks/use-memories'
import { View } from 'react-native'

export function MemoriesList() {
  const { memories, onNextPage } = useMemories()

  return (
    <FlashList
      data={memories}
      contentContainerStyle={{
        paddingBottom: 64,
      }}
      keyExtractor={(i) => i.id}
      onEndReached={onNextPage}
      ItemSeparatorComponent={() => <View className="h-5" />}
      renderItem={({ item }) => <MemoryItem memory={item} />}
      estimatedItemSize={300}
    />
  )
}

const MemoryItem = ({ memory }: { memory: MemoryModel }) => (
  <Memory.Card>
    <Memory.Header>13 de Abril, 2023</Memory.Header>

    <Memory.Content>
      <Memory.Image image={memory.coverUrl} />
      <Memory.Body>{memory.shortDescription}...</Memory.Body>

      <Memory.ReadMore />
    </Memory.Content>
  </Memory.Card>
)
