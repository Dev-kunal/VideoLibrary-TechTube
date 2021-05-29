import axios from "axios";

// const instance = axios.create({
//   baseURL: "https://video-library-server2.kunaltijare.repl.co",
// });

export const UseAxios = async (method, url, body = {}) => {
  let response;
  switch (method) {
    case "GET":
      response = await axios.get(url, {
        headers: { userId: "60a64645a5d8e800de5eab50" },
      });
      console.log("method==>", method);
      console.log("url==>", url);
      return response.data;
    case "POST":
      response = await axios.post(url, body);
      return response.data;
    case "DELETE":
      response = await axios.delete(url, body);
      return response.data;
    default:
      return response;
  }
};
