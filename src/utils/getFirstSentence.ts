export const getFirstSentence = (html: string) => {
  const element = document.createElement("div");
  element.innerHTML = html;
  return element.innerText.split(".")[0] + ".";
};
