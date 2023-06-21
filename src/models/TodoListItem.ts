export class TodoListItem {
  label: string
  key: string
  completed?: boolean
  sharedWith?: Array<string>
  taskGroupId?: number

  constructor(label: string, sharedWith?: Array<string>, taskGroupId?: number, completed?: boolean, 
    key?: string) {
      this.label = label
      this.key = key || Date.now().toString()
      this.completed = completed
      this.sharedWith = sharedWith
      this.taskGroupId = taskGroupId
  }
}
