export class User {
  uid: string
  friends: Array<string>
  email: string
  displayName?: string | null
  photoURL?: string | null

  constructor(uid: string, email: string, displayName?: string | null, 
    photoURL?: string | null, friends?: Array<string>) {
      this.uid = uid
      this.friends = friends || []
      this.email = email
      this.displayName = displayName
      this.photoURL = photoURL
    }

  public toObject(): Object {
    return {
      uid: this.uid,
      friends: this.friends,
      email: this.email,
      displayName: this.displayName,
      photoUrl: this.photoURL
    }
  }

  public static createTempUser(): User {
    return new User('', '')
  }
}