import { FridgeItem } from "./../constants/Types";

// TODO: Move to env
const ENDPOINT = "https://appwrite-didattica.supsi.ch/v1";
const PROJECT = "63f75b71ef1bbcb3604c";
const FUNCTION = "openai-recipes";

export default async function generateRecipe(
  items: Array<FridgeItem>,
  measurementSystem: string,
  language: string
) {
  console.log(
    "[openai-recipes] Generating recipe with ",
    items.length,
    " ingredients"
  );

  const payload = {
    measurementSystem,
    ingredients: items.map((item) => item.product.product_name).join(","),
    language: language == "it" ? "ITALIANO" : "ENGLISH",
  };

  console.log("[openai-recipes] Payload", payload);

  try {
    const response = await fetch(
      `${ENDPOINT}/functions/${FUNCTION}/executions`,
      {
        method: "POST",
        body: JSON.stringify({
          data: JSON.stringify(payload),
        }),
        headers: {
          "content-type": "application/json",
          "x-appwrite-project": PROJECT,
        },
      }
    );

    const data = await response.json();
    console.log("[openai-recipes] ", data);
    if (data.response) {
      const { recipe } = JSON.parse(data.response);

      return recipe;
    }
  } catch (e) {
    console.log("[openai-recipes] Error", e);
  }
  return null;
}
