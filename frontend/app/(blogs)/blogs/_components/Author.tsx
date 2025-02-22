import Avatar from "@/_components/_ui/Avatar";

function Author({ avatarUrl, name } : {avatarUrl :string , name : string}) {
  return (
    <div className="flex items-center ">
      <Avatar src={avatarUrl} />
      <span className="text-xs text-secondary-500">{name}</span>
    </div>
  );
}
export default Author;
