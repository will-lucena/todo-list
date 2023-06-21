import type { TaskGroup } from './TaskGroup'

export class User {
  private uid: string
  private friends: Array<string>
  private email: string
  private displayName?: string | null
  private photoURL?: string | null
  private taskGroups: Array<TaskGroup>

  constructor(uid: string, email: string, displayName?: string | null, 
    photoURL?: string | null, friends?: Array<string>, taskGroups?: Array<TaskGroup>) {
    this.uid = uid
    this.friends = friends || []
    this.email = email
    this.displayName = displayName
    this.photoURL = photoURL
    this.taskGroups = taskGroups || []
  }

  public static createTempUser(): User {
    return new User('', '')
  }

  public toObject(): Object {
    return {
      uid: this.uid,
      friends: this.friends,
      email: this.email,
      displayName: this.displayName,
      photoUrl: this.photoURL,
      taskGroups: this.taskGroups
    }
  }

  public getUserCopy(): User {
    return this
  }

  public getUserEmail(): string {
    return this.email
  }

  public getFriends(): Array<string> {
    return this.friends
  }

  public getTaskGroups(): Array<TaskGroup> {
    return this.taskGroups
  }

  public addFriend(friendEmail: string): void {
    this.friends.push(friendEmail)
  }

  public addGroup(group: TaskGroup): void {
    this.taskGroups.push(group)
  }
}