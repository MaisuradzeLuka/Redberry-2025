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
