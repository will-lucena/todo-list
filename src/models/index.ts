class TodoListItem {
  label: string
  key: string
  completed?: boolean
  sharedWith?: Array<string>

  constructor(
    label: string,
    key?: string,
    completed?: boolean,
    sharedWith?: Array<string>){
    this.label = label
    this.key = key || Date.now().toString()
    this.completed = completed
    this.sharedWith = sharedWith
  }
}

class User {
  uid: string;
  friends?: Array<string> | null;
  email: string;
  displayName?: string | null;
  photoURL?: string | null;

  constructor(uid: string, email: string, displayName?: string | null, 
    photoURL?: string | null, friends?: Array<string> | null){
    this.uid = uid
    this.friends = friends || []
    this.email = email
    this.displayName = displayName
    this.photoURL = photoURL
  }

  public toObject(): Object{
    return {
      uid: this.uid,
      friends: this.friends,
      email: this.email,
      displayName: this.displayName,
      photoUrl: this.photoURL
    }
  }

  public static createTempUser(): User{
    return new User('', '')
  }
}

interface onChangeItemPayload {
  index: number
  value: boolean
}

export type { onChangeItemPayload }
export {
  TodoListItem,
  User
}

