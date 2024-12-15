const Blog = async ({ params }: { params: Promise<{ id: string }> }) => {
  const str = `${(await params).id}`;
  console.log("str", str);
  return (
    <div>
      <p>Chau Tech Brainstorming</p>
    </div>
  );
};

export default Blog;
