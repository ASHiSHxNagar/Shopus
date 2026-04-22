"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ProductsPage() {
  const productSchema = z.object({
  name: z.string().min(1, "Name required"),
  price: z.number().min(1, "Price must be > 0"),
});

  const utils = trpc.useUtils();
  const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
} = useForm({
  resolver: zodResolver(productSchema),
});


  const { data, isLoading } = trpc.product.getAll.useQuery();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const createProduct = trpc.product.create.useMutation({
    onSuccess: () => {
      utils.product.getAll.invalidate();
    },
  });

  const updateProduct = trpc.product.update.useMutation({
    onSuccess: () => {
      utils.product.getAll.invalidate();
      setEditingId(null);
    },
  });

  const deleteProduct = trpc.product.delete.useMutation({
    onSuccess: () => {
      utils.product.getAll.invalidate();
    },
  });

  const onSubmit = (data: any) => {
  createProduct.mutate({
    name: data.name,
    price: Number(data.price),
  });

  reset();
};

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      {/* Create form */}
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">

  <div>
    <input
      {...register("name")}
      placeholder="Product name"
      className="bg-zinc-900 px-3 py-2 rounded"
    />
    {errors.name && (
      <p className="text-red-500 text-xs mt-1">
        {errors.name.message as string}
      </p>
    )}
  </div>

  <div>
    <input
      {...register("price", { valueAsNumber: true })}
      placeholder="Price"
      className="bg-zinc-900 px-3 py-2 rounded"
    />
    {errors.price && (
      <p className="text-red-500 text-xs mt-1">
        {errors.price.message as string}
      </p>
    )}
  </div>

  <button
    type="submit"
    className="bg-blue-600 px-4 py-2 rounded"
  >
    Add
  </button>

</form>

      {/* List */}
      <div className="border border-zinc-800 rounded-lg p-6">
        {data?.length === 0 && (
          <p className="text-zinc-500 text-center">No products yet.</p>
        )}

        {data?.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between border-b border-zinc-800 py-2"
          >
            {editingId === p.id ? (
              <div className="flex gap-2">
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="bg-zinc-900 px-2 py-1 rounded"
                />

                <input
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="bg-zinc-900 px-2 py-1 rounded"
                />

                <button
                  onClick={() =>
                    updateProduct.mutate({
                      id: p.id,
                      name: editName,
                      price: Number(editPrice),
                    })
                  }
                  className="text-green-400"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <span>
                  {p.name} — ₹{p.price}
                </span>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setEditingId(p.id);
                      setEditName(p.name);
                      setEditPrice(String(p.price));
                    }}
                    className="text-blue-400 text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct.mutate({ id: p.id })}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
