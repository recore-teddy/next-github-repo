import { useState } from "react";
import { useRouter } from "next/router";

const App = () => {
  const [name, setName] = useState("");
  const router = useRouter();
  return (
    <div>
      <div>
        <img src="/teddy.jpeg" alt="profile-img" width="500px" />
      </div>
      <button type="button" onClick={() => router.push("/tomato")}>
        tomato로 가기
      </button>
      <p>이름</p>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button type="button" onClick={() => router.push(`/vegetable/${name}`)}>
        {name}으로 가기
      </button>
    </div>
  );
};

export default App;
