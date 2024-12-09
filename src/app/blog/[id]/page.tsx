const Blog = async ({ params }: { params: Promise<{ id: string }> }) => {
  const str = `${(await params).id}`;
  return <div>{str}</div>;
};

export default Blog;
