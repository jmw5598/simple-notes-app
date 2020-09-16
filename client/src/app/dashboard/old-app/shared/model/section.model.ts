export class Section {

  public id: number;
  public title: string;
  public synopsis: string;
  public notes: string;
  public createdOn: Date;
  public lastModified: Date;

  constructor(
    id: number,
    title: string,
    synopsis: string,
    notes: string,
    createdOn: Date,
    lastModified: Date
  ) {
    this.id = id;
    this.title = title;
    this.synopsis = synopsis;
    this.notes = notes;
    this.createdOn = createdOn;
    this.lastModified = lastModified;
  }
}
