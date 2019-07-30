export class AlbumModel {
    id?: string;
    uid?: string;
    album?: string;
    artist?: string;
    releaseDate?: string;
    spotify?: string;
    credits?: [Credits];
    creditType?: string;
    image?: string;
    imageName?: string;
    image425?: string;
    image200?: string;
    image75?: string;
    thumb?: string;

  }
  
  export class Credits {
    title?: string;
  }
  