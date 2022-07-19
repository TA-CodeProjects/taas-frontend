export class TodoModel {
  public id?: number;
  public caption?: string;
  public info?: string;
  public classification?: string;
  public dueDate?: Date;

  public constructor(
    id: number,
    caption: string,
    info: string,
    classification: string,
    dueDate: Date
  ) {
    this.id = id;
    this.caption = caption;
    this.info = info;
    this.classification = classification;
    this.dueDate = dueDate;
  }
}
