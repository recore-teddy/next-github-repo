import fetch from "isomorphic-unfetch";

const name = ({ user }) => {
  const username = user && user.name;
  return (
    <>
      <div>{username}</div>
      <div>
        <img src={user.avatar_url} alt="user-avatar" />
      </div>
    </>
  );
};

export const getServerSideProps = async ({ query }) => {
  // console.log(query);
  const { name } = query;
  try {
    const res = await fetch(`https://api.github.com/users/${name}`);
    if (res.status === 200) {
      const user = await res.json();
      console.log(user);
      return { props: { user } };
    }
  } catch (e) {
    console.log(e);
    return {};
  }

  return {}; // to avoid eslint(consistent-return) problems.
};

export default name;
