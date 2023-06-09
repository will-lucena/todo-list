export class TodoListItem {
  label: string
  key: string
  completed?: boolean
  sharedWith?: Array<string>
  taskGroup?: string

  constructor(label: string, sharedWith?: Array<string>, taskGroup?: string, completed?: boolean, 
    key?: string) {
      this.label = label
      this.key = key || Date.now().toString()
      this.completed = completed
      this.sharedWith = sharedWith
      this.taskGroup = taskGroup
  }
}
