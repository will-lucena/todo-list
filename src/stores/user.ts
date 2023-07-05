import { upsertUsersBase } from '@/api'
import { User } from '@/models'
import { TaskGroup } from '@/models/TaskGroup'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(User.createTempUser())

  function updateUser(payload: User) {
    Object.assign(user.value, payload)
    upsertUsersBase(user.value.getUserCopy())
  }

  async function addFriend(friendEmail: string){
    user.value.addFriend(friendEmail)
    await upsertUsersBase(user.value.getUserCopy())
  }

  async function addGroup(groupName: string){
    user.value.addGroup(new TaskGroup(groupName))
    await upsertUsersBase(user.value.getUserCopy())
  }

  return { user: user.value, updateUser, addFriend, addGroup }
})
