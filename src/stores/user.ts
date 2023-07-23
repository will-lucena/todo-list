import { User } from '@/models'
import { Api } from '@/models/Api'
import { TaskGroup } from '@/models/TaskGroup'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(User.createTempUser())

  function updateUser(payload: User) {
    Object.assign(user.value, payload)
    Api.getInstance().upsertUsersBase(user.value.getUserCopy())
  }

  async function addFriend(friendEmail: string){
    user.value.addFriend(friendEmail)
    await Api.getInstance().upsertUsersBase(user.value.getUserCopy())
  }

  async function addGroup(groupName: string){
    user.value.addGroup(new TaskGroup(groupName))
    await Api.getInstance().upsertUsersBase(user.value.getUserCopy())
  }

  return { user: user.value, updateUser, addFriend, addGroup }
})
