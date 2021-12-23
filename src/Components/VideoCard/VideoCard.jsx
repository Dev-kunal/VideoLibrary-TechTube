
export const VideoCard = ({
  video: { _id, name, thumbnail, views, videoLength },
}) => {
  return (
    <>
      <div className="w-full md:w-64 my-3 mx-1 text-black cursor-pointer hover:shadow-md">
        <div className="relative">
          <img height="auto" width="100%" src={thumbnail} alt="thumbnail" />
          <div className=" bg-zinc-800 absolute bottom-0 right-0 text-xs text-white px-px ">{videoLength}</div>
        </div>
        <div className="flex p-1">
          <img
            className="w-8 h-8 rounded-full mt-2 mr-0.5"
            src="https://yt3.ggpht.com/ytc/AAUvwnhyHW7QINneXdZPEHNEl3kUIh7giLIaRrwk4CFXeA=s88-c-k-c0x00ffffff-no-rj"
            alt="Avatar"
          />

          <div className="p-1">
            <h4 className="font-semibold" >{name} </h4>
            <span className="text-sm text-zinc-800">Beebom</span>
            <br />
            <span className="text-sm text-zinc-800">{views} views</span>
          </div>
        </div>
      </div>
    </>
  );
};
