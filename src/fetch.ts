const serverURL = () =>
  //@ts-ignore
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : //@ts-ignore
      import.meta.env.VITE_API_URL;

export async function fetchDesigns(searchParams: URLSearchParams) {
  const requestOptions = {
    method: "GET",
  };

  return fetch(`${serverURL()}/designs/?${searchParams}`, requestOptions);
}

export async function fetchSingleDesign(designId: number) {
  const requestOptions = {
    method: "GET",
  };

  return fetch(`${serverURL()}/designs/${designId}`, requestOptions);
}
