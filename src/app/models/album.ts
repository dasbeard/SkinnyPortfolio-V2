export class AlbumModel {
    uid?: string;
    album?: string;
    artist?: string;
    image?: string;
    imageName?: string;
    image425?: string;
    image200?: string;
    image75?: string;
    releaseDate?: string;
    spotify?: string;
    credits?: [Credits];
    creditType?: string;
    thumb?: string;

  }
  
  export class Credits {
    title?: string;
  }
  