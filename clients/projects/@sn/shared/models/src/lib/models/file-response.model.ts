export class FileResponse {
  constructor(
    public blob: Blob,
    public filename: string
  ) {}
}