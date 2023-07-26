import { TodoListItem } from '@/models'
import { Api } from '@/models/Api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTodoItemsStore = defineStore('todoItems', () => {
  const storedItems = ref(Array<TodoListItem>())

  async function updateItem(index: number, value: Boolean) {
    Object.assign(storedItems.value[index], { completed: value})
    await Api.getInstance().updateCollectionItem(storedItems.value[index])
  }

  async function addItem(item: TodoListItem){
    storedItems.value.unshift(item)
    Api.getInstance().addToCollection(item)
  }

  async function loadItems(collectionKey: string, taskGroupId: number) {
    if (storedItems.value.length > 0){
      return
    }

    Api.getInstance().getCollection(collectionKey).then((res) => {
      const filteredRes = res.filter((el) => {
        return el.taskGroupId == taskGroupId
      })
      storedItems.value.push(...filteredRes)
    })
  }

  function completeBatch(batch: Array<TodoListItem>){
    batch.forEach(async element => {
      const index = storedItems.value.findIndex(el => el.key === element.key)
      await updateItem(index, true)
    });
  }

  function deleteBatch(batch: Array<TodoListItem>){
    const array = storedItems.value.filter(el => !batch.includes(el))
    storedItems.value.length = 0
    storedItems.value.push(...array)
    batch.forEach(async element => {
      await Api.getInstance().removeFromCollection(element.key)
    });
  }

  return { storedItems: storedItems.value, updateItem, addItem, loadItems, completeBatch, deleteBatch }
})
