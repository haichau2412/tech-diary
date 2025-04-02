import { content } from "./component";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const Post = content.find(({ id: _id }) => id === _id);

  return (
    <>
      {Post ? (
        <div className="mx-2 flex flex-grow flex-col items-center overflow-auto">
          {Post.content}
        </div>
      ) : null}
    </>
  );
}

export function generateStaticParams() {
  return content.map(({ id }) => ({ id }));
}

export const dynamicParams = false;
