import rawPortfolio from "../index.html?raw";

function getBodyMarkup(html: string) {
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;
  return body.replace(/<script[\s\S]*?<\/script>/gi, "");
}

export default function Home() {
  return <div dangerouslySetInnerHTML={{ __html: getBodyMarkup(rawPortfolio) }} />;
}
