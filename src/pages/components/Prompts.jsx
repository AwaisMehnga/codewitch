const prompt =
  "Describe this UI in accurate details. When you reference a UI element put its name and bounding box in the format: [object name (y_min, x_min, y_max, x_max)]. Also Describe the color of the elements. At the end Create a Tree of UI elements in the format: [object name] -> [child object name] -> [child object name] etc. ";

const refine_prompt = (description) =>
  `Compare the described UI elements with the provided image and identify any missing elements or inaccuracies. Also Describe the color of the elements. Provide a refined and accurate description of the UI elements based on this comparison. Here is the initial description: ${description}`;

const html_prompt = (framework, refined_description) =>
  `Create an HTML file based on the following UI description, using the UI elements described in the previous response. Include ${framework} CSS within the HTML file to style the elements (Do not use inline CSS everywhere instead use <style></style> tag). Make sure the colors used are the same as the original UI. The UI needs to be responsive and mobile-first, matching the original UI as closely as possible. Do not include any explanations or comments. Avoid using \`\`\`html. and \`\`\` at the end. Here is the refined description: ${refined_description}`;

const refine_html_prompt = (framework, initial_html) =>
  `Validate the following HTML code based on the UI description and image and provide a refined version of the HTML code with ${framework} CSS that improves accuracy, responsiveness, and adherence to the original design. Avoid using \`\`\`html. and \`\`\` at the end. Here is the initial HTML: ${initial_html}`;

export { prompt, refine_prompt, html_prompt, refine_html_prompt };
