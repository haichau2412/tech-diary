"use client";

const UserProfileForm = () => {
  return (
    <div className="mt-12 w-2/3 rounded p-8 shadow-lg lg:w-1/2">
      <h2 className="mb-6 text-lg font-medium">Update your info</h2>

      <form action={() => {}} className="flex justify-between gap-3">
        <input
          type="text"
          name="name"
          className="flex-1 border px-2 py-1"
          defaultValue={"ss"}
        />
        <button className="rounded bg-slate-700 px-3 py-1 text-white">
          Update
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;
