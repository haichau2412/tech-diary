"use client";

import { useForm, useFieldArray, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { dishSchema } from "../../../schema";

type DishFormData = z.infer<typeof dishSchema>;

type CondimentProps = {
  control: Control<DishFormData>;
};

function CondimentsField({ control }: CondimentProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "condiments",
  });

  return (
    <div>
      <label className="block font-medium">Condiments</label>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-2 rounded border bg-gray-100 p-2">
          <div>
            <label className="block font-medium">Condiment Name</label>
            <input
              {...control.register(`condiments.${index}.name`)}
              className="w-full rounded border p-2"
              placeholder="Condiment Name"
            />
          </div>

          <div>
            <label className="block font-medium">
              Options (comma separated)
            </label>
            <input
              {...control.register(`condiments.${index}.options`)}
              className="mt-2 w-full rounded border p-2"
              placeholder="e.g. ketchup, mustard"
            />
          </div>

          <button
            type="button"
            onClick={() => remove(index)}
            className="mt-2 rounded bg-red-500 px-2 py-1 text-white"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({ id: "", name: {}, description: "", options: [] })
        }
        className="mt-2 rounded bg-blue-500 px-3 py-1 text-white"
      >
        + Add Condiment
      </button>
    </div>
  );
}

export default function AddDishForm() {
  const { control, handleSubmit } = useForm<DishFormData>({
    resolver: zodResolver(dishSchema),
  });

  const onSubmit = (data: DishFormData) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <CondimentsField control={control} />

      <button
        type="submit"
        className="w-full rounded bg-green-500 p-2 text-white"
      >
        Submit Dish
      </button>
    </form>
  );
}
