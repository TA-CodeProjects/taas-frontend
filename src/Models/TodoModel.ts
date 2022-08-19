export class TodoModel {
  public id?: number;
  public caption?: string;
  public info?: string;
  public classification?: string;
  public done?: boolean;
  public dueDate?: Date;

  public constructor(
    id: number,
    caption: string,
    info: string,
    classification: string,
    done: boolean,
    dueDate: Date
  ) {
    this.id = id;
    this.caption = caption;
    this.info = info;
    this.classification = classification;
    this.done = done;
    this.dueDate = dueDate;
  }
}
