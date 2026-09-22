import locationIcon from "../assets/location.svg";
import twitterIcon from "../assets/twitter.svg";
import linkIcon from "../assets/link.svg";
import companyIcon from "../assets/company.svg";

function UserData({ user }) {
  if (!user) return null;

  const name = user.name;
  const imgUrl = user.avatar_url;
  const username = user.login;
  const bio = user.bio || "This profile has no bio";
  const repos = user.public_repos;
  const followers = user.followers;
  const following = user.following;
  const location = user.location || "Not available";
  const twitter = user.twitter || "Not available";
  const blog = user.blog || "Not available";
  const company = user.company || "Not available";
  const date = new Date(user.created_at);

  return (
    <div className="user-container flex flex-col md:flex-row w-4/5 md:w-3/5 m-auto bg-[#f6f8fa] dark:bg-gray-700 rounded-lg p-10 gap-10">
      {imgUrl && (
        <img
          src={imgUrl}
          alt={`${name || username} profile picture`}
          width={100}
          height={100}
          loading="lazy"
          className="profile-picture h-min rounded-full"
        />
      )}
      <div className="w-full">
        <div className="user-container-header mb-4">
          <h3 className="name flex items-center justify-between mb-1">
            {name}
            <span className="creation-date text-xs font-light">
              Joined{" "}
              {date.toLocaleDateString("en-GB", {
                dateStyle: "medium",
              })}
            </span>
          </h3>
          <a
            href={`https://github.com/${username}`}
            className="username block mb-4 text-sky-500 text-sm"
          >
            @{username}
          </a>
          <p className="user-bio text-sm mb-1">{bio}</p>
        </div>
        <div className="user-info flex justify-between bg-[#e6eaef] dark:bg-gray-800 py-2 px-4 rounded-lg mb-4">
          <div>
            <p className="info-label text-xs">Repos</p>
            <p className="info-data font-bold">{repos}</p>
          </div>
          <div>
            <p className="info-label text-xs">Followers</p>
            <p className="info-data font-bold">{followers}</p>
          </div>
          <div>
            <p className="info-label text-xs">Following</p>
            <p className="info-data font-bold">{following}</p>
          </div>
        </div>
        <div className="additional-info flex flex-col text-sm">
          <div className="block sm:flex justify-between">
            <p className="location mb-2">
              <img
                src={locationIcon}
                alt="Location icon"
                width={18}
                height={18}
                loading="lazy"
                className="float-left contrast-0 dark:contrast-100 dark:invert mr-2"
              />
              {location}
            </p>
            <p className="twitter mb-2">
              <img
                src={twitterIcon}
                alt="Twitter icon"
                width={18}
                height={18}
                loading="lazy"
                className="float-left contrast-0 dark:contrast-100 dark:invert mr-2"
              />
              {twitter}
            </p>
          </div>
          <div className="block sm:flex justify-between">
            <p className="blog mb-2">
              <img
                src={linkIcon}
                alt="Link icon"
                width={18}
                height={18}
                loading="lazy"
                className="float-left contrast-0 dark:contrast-100 dark:invert mr-2"
              />
              {blog}
            </p>
            <p className="company">
              <img
                src={companyIcon}
                alt="Company icon"
                width={18}
                height={18}
                loading="lazy"
                className="float-left contrast-0 dark:contrast-100 dark:invert mr-2"
              />
              {company}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserData;
