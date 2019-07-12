export class AlbumModel {
    uid?: string;
    album?: string;
    artist?: string;
    image?: string;
    image425?: string;
    image200?: string;
    image75?: string;
    year?: number;
    credits?: [Credits];
  }
  
  export class Credits {
    title?: string;
  }
  