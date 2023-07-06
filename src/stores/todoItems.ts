import { addToCollection, batchUpdate, getCollection, updateCollectionItem } from '@/api'
import { TodoListItem } from '@/models'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTodoItemsStore = defineStore('todoItems', () => {
  const storedItems = ref(Array<TodoListItem>())

  function updateItem(index: number, value: Boolean) {
    Object.assign(storedItems.value[index], { completed: value})
    updateCollectionItem(storedItems.value[index])
  }

  async function addItem(item: TodoListItem){
    storedItems.value.unshift(item)
    addToCollection(item)
  }

  async function loadItems(collectionKey: string, taskGroupId: number) {
    getCollection(collectionKey).then((res) => {
      const filteredRes = res.filter((el) => {
        return el.taskGroupId == taskGroupId
      })
      storedItems.value.push(...filteredRes)
    })
  }

  function completeBatch(batch: Array<TodoListItem>){
    batch.forEach(element => {
      const index = storedItems.value.findIndex(el => el.key === element.key)
      updateItem(index, true)
    });
  }

  function deleteBatch(batch: Array<TodoListItem>){
    storedItems.value.filter(el => !batch.includes(el))
    batchUpdate(batch)
  }

  return { storedItems: storedItems.value, updateItem, addItem, loadItems, completeBatch, deleteBatch }
})
