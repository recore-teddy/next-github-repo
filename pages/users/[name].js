import css from "styled-jsx/css";

import Profile from "../../components/Profile";
import Repositories from "../../components/Repositories";

const style = css`
  .user-content-wrapper {
    display: flex;
    padding: 20px;
  }
`;

const name = ({ user, repos }) => {
  return (
    <div className="user-content-wrapper">
      <Profile user={user} />
      <Repositories user={user} repos={repos} />
      <style jsx>{style}</style>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  console.log("query", query);
  const { name, page = 1 } = query;
  console.log("name", name, "page", page);
  try {
    let user;
    let repos;

    const userRes = await fetch(`https://api.github.com/users/${name}`);
    if (userRes.status === 200) {
      user = await userRes.json();
    }

    const repoRes = await fetch(
      `https://api.github.com/users/${name}/repos?sort=updated&page=${page}&per_page=10`
    );
    if (repoRes.status === 200) {
      repos = await repoRes.json();
    }
    console.log(repos);

    return { props: { user, repos } };
  } catch (e) {
    console.log(e);
    return { props: {} };
  }
};

export default name;
