export class TodoDto {
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public completedAt: Date;
  public description: string;
  public isComplete: boolean;
}
