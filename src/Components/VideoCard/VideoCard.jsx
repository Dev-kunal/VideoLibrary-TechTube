import "./videocard.css";

export const VideoCard = ({
  video: { _id, name, thumbnail, views, videoLength },
}) => {
  return (
    <>
      <div className="card video-card">
        <div className="card-img">
          <img height="auto" width="100%" src={thumbnail} alt="thumbnail" />
          <div className="time-stamp">{videoLength}</div>
        </div>
        <div className="video-text-container">
          <img
            className="avatar-small xs"
            src="https://yt3.ggpht.com/ytc/AAUvwnhyHW7QINneXdZPEHNEl3kUIh7giLIaRrwk4CFXeA=s88-c-k-c0x00ffffff-no-rj"
            alt="Avatar"
          />

          <div className="video-text">
            <h4>{name} </h4>
            <span className="small">Beebom</span>
            <br />
            <span className="small">{views} views</span>
          </div>
        </div>
      </div>
    </>
  );
};
