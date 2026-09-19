function UserData({
  name,
  imgUrl,
  creationDate,
  username,
  bio,
  repos,
  followers,
  following,
  location,
  twitter,
  blog,
  company,
}) {
  const date = new Date(creationDate);

  return (
    <div className="user-container">
      {imgUrl && (
        <img
          src={imgUrl}
          alt={ `${name || username} profile picture`}
          width={100}
          height={100}
          loading="lazy"
          className="profile-picture"
        />
      )}
      <div>
        <div className="user-container-header">
          <h3 className="name">{name}</h3>
          <span className="creation-date">
            Joined{" "}
            {date.toLocaleDateString("en-GB", {
              dateStyle: "medium",
            })}
          </span>
          <p className="username">@{username}</p>
          <p className="user-bio">{bio || "This profile has no bio"}</p>
        </div>
        <div className="user-info">
          <div>
            <p className="info-label">Repos</p>
            <p className="info-data">{repos}</p>
          </div>
          <div>
            <p className="info-label">Followers</p>
            <p className="info-data">{followers}</p>
          </div>
          <div>
            <p className="info-label">Following</p>
            <p className="info-data">{following}</p>
          </div>
        </div>
        <div className="additional-info">
          <p className="location">{location || "Not available"}</p>
          <p className="twitter">{twitter || "Not available"}</p>
          <p className="blog">{blog || "Not available"}</p>
          <p className="company">{company || "Not available"}</p>
        </div>
      </div>
    </div>
  );
}

export default UserData;
