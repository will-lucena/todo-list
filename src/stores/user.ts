import { User } from '@/models'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(User.createTempUser())

  function updateUser(payload: User) {
    Object.assign(user.value, payload)
  }

  return { user: user.value, updateUser }
})
