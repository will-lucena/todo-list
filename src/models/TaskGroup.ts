export class TaskGroup {
  name: string
  id: number

  public static PERSONAL_GROUP_ID = 0
  public static SHARED_WITH_ME_GROUP_ID = 1

  constructor(label: string, id?: number) {
      this.name = label
      this.id = id || Number(Date.now().toString())
  }
}