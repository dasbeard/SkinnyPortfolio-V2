export class AlbumModel {
    uid?: string;
    album?: string;
    artist?: string;
    image?: string;
    imageName?: string;
    // image425?: string;
    // image200?: string;
    // image75?: string;
    year?: number;
    spotifyLink?: string;
    credits?: [Credits];
    creditType?: string;

  }
  
  export class Credits {
    title?: string;
  }
  