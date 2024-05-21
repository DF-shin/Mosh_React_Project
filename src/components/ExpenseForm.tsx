import React, { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories } from "./categories";

const schema = z.object({
  description: z
    .string()
    .max(50, { message: "Can't be longer than 50 characters" })
    .min(3, { message: "Must be at least 3 characters" }),
  amount: z
    .number({ invalid_type_error: "Amount field is required" })
    .min(1)
    .max(100_000),
  category: z.enum(categories),
});

type ExpenseFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>

      <div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            id="amount"
            type="number"
            className="form-control"
          />
          {errors.amount && (
            <p className="text-danger">{errors.amount.message}</p>
          )}
        </div>
      </div>

      <div>
        <div className="mb-3">
          <label htmlFor="category" className="form-lable">
            Category
          </label>
          <select
            {...register("category")}
            id="category"
            className="form-control"
            typeof="text"
          >
            <option value=""></option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>
      </div>

      <div>
        <button
          disabled={!isValid}
          className="btn btn-primary mb-3"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
