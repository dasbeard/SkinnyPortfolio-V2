export class Image {
    $key: string;
    file: File;
    name: string;
    progress: number;
    createdAt: Date = new Date();
  
    constructor(file: File) {
      this.file = file;
    }
  }
  