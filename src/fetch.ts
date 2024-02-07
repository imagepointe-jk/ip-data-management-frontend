const serverURL = () =>
  //@ts-ignore
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : //@ts-ignore
      import.meta.env.VITE_API_URL;

export async function fetchDesigns() {
  const requestOptions = {
    method: "GET",
  };

  return fetch(`${serverURL()}/designs`, requestOptions);
}
