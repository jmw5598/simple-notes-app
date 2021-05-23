export class TodoDto {
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public startedBy: Date;
  public completedBy: Date;
  public description: string;
  public isComplete: boolean;
}
