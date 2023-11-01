import { endpoint } from "@/utils/endpoint";

export async function answerQuestion(
  questionId: string,
  alternativeId: string
): Promise<any> {
  const url = `${endpoint}/api/questions/answer`;
  const data = { alternativeId, questionId };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Handle error cases here if needed
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const content = await response.json(); // Parse JSON response
    return content; // Return the parsed content
  } catch (error) {
    // Handle any exceptions that may occur during the fetch
    console.error("Error while fetching data:", error);
    throw error; // Rethrow the error if necessary
  }
}
