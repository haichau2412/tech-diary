"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Image from "next/image";

// Define Schema
const dishSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  image: z.instanceof(FileList).optional(),
  condiments: z
    .array(
      z.object({
        name: z.string().min(1, "Condiment name is required"),
        options: z.string().min(1, "At least one option is required"),
      }),
    )
    .optional(),
});

type DishFormData = z.infer<typeof dishSchema>;

export default function AddDishForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DishFormData>({
    resolver: zodResolver(dishSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "condiments",
  });

  const [preview, setPreview] = useState<string | null>(null);

  const onSubmit = (data: DishFormData) => {
    console.log("Submitted Data:", data);
  };

  return (
    <div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Add New Dish</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="block">
          Category:
          <select
            {...register("category")}
            className="w-full rounded border p-2"
          >
            <option value="">Select a category</option>
            <option value="tech">Technology</option>
            <option value="science">Science</option>
            <option value="arts">Arts</option>
          </select>
        </label>

        {/* Name */}
        <div>
          <label className="block font-medium">Dish Name</label>
          <input
            {...register("name")}
            className="w-full rounded border p-2"
            placeholder="Enter dish name"
            autoComplete="false"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full rounded border p-2"
            placeholder="Enter description"
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium">Price ($)</label>
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            className="w-full rounded border p-2"
            placeholder="Enter price"
          />
          {errors.price && (
            <p className="text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium">Category</label>
          <select
            {...register("category")}
            className="w-full rounded border p-2"
          >
            <option value="">Select Category</option>
            <option value="appetizer">Appetizer</option>
            <option value="main">Main Course</option>
            <option value="dessert">Dessert</option>
          </select>
          {errors.category && (
            <p className="text-sm text-red-500">{errors.category.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium">Upload Image</label>
          <input
            type="file"
            {...register("image")}
            className="w-full rounded border p-2"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setPreview(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
          {preview && (
            <Image
              src={preview}
              alt="Preview"
              className="mt-2 h-32 w-32 rounded-md object-cover"
            />
          )}
        </div>

        {/* Condiments */}
        <div>
          <label className="block font-medium">Condiments</label>
          {fields.map((field, index) => (
            <div key={field.id} className="mb-2 rounded border bg-gray-100 p-2">
              <input
                {...register(`condiments.${index}.name`)}
                className="w-full rounded border p-2"
                placeholder="Condiment Name"
              />
              {errors.condiments?.[index]?.name && (
                <p className="text-sm text-red-500">
                  {errors.condiments[index]?.name?.message}
                </p>
              )}

              <input
                {...register(`condiments.${index}.options`)}
                className="mt-2 w-full rounded border p-2"
                placeholder="Condiment Options (comma separated)"
              />
              {errors.condiments?.[index]?.options && (
                <p className="text-sm text-red-500">
                  {errors.condiments[index]?.options?.message}
                </p>
              )}

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
            onClick={() => append({ name: "", options: "" })}
            className="mt-2 rounded bg-blue-500 px-3 py-1 text-white"
          >
            + Add Condiment
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded bg-green-500 p-2 text-white"
        >
          Submit Dish
        </button>
      </form>
    </div>
  );
}
