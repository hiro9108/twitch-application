import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { api } from "api/base";

const App = () => {
  const { register, handleSubmit } = useForm();
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const client_id = process.env.REACT_APP_CLIENT_ID;
    const client_secret = process.env.REACT_APP_CLIENT_SECRET;
    const grant_type = process.env.REACT_APP_CLIENT_GRANT_TYPE;
    const scope = process.env.REACT_APP_CLIENT_SCOPE;

    const TOKEN_URL = `https://id.twitch.tv/oauth2/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=${grant_type}&scope=${scope}`;

    fetch(TOKEN_URL, { method: "POST" }).then(async (res) => {
      const data = await res.json();
      setAccessToken(data.access_token);
    });
  }, []);

  const onSubmit = (data) => {
    const URL = `/search/channels?query=${data.channel}`;
    api
      .get(URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Client-ID": process.env.REACT_APP_CLIENT_ID,
        },
      })
      .then(({ data }) => console.log(data));
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <h1 className="text-red-400">Twitch API</h1>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("channel")}
              type="search"
              placeholder="Search..."
              className="bg-gray-100"
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
