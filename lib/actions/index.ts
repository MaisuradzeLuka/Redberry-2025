"use server";

export const fetchData = async (additionalUrl: string) => {
  const apiUrl = process.env.NEXT_MOMENTUM_API!;
  const TOKEN = process.env.NEXT_BEARER_TOKEN!;

  try {
    const res = await fetch(`${apiUrl}/${additionalUrl}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (!res.ok) throw new Error("Respose wasnt successful");

    const data = await res.json();

    return data;
  } catch (error: any) {
    throw new Error(`Something went wrong: ${error.message}`);
  }
};

export const postData = async (additionalUrl: string, body: any) => {
  const apiUrl = process.env.NEXT_MOMENTUM_API!;
  const TOKEN = process.env.NEXT_BEARER_TOKEN!;

  try {
    const res = await fetch(`${apiUrl}/${additionalUrl}`, {
      method: "POST",
      body: body,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (res.status !== 201) throw new Error("Respose wasnt successful");

    console.log(res);

    const data = await res.json();

    if (data) {
      return "SUCCESS";
    }
  } catch (error: any) {
    throw new Error(`Something went wrong: ${error.message}`);
  }
};
