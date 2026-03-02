"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

type FormField = {
  name: string;
  type: "text" | "email" | "password" | "textarea" | "select" | "number" | "date" | "file";
  label: string;
  required?: boolean;
  placeholder?: string;
  validation?: {
    min?: number;
    max?: number;
  };
  options?: { value: string; label: string }[];
  multiple?: boolean;
  accept?: string;
};

type DynamicFormProps = {
  formType: string;
  role?: string;
  onSubmit: (data: any) => Promise<void>;
  submitLabel?: string;
};

export default function DynamicForm({
  formType,
  role,
  onSubmit,
  submitLabel = "Submit"
}: DynamicFormProps) {
  const [fields, setFields] = useState<FormField[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Create dynamic Zod schema based on fields
  const createSchema = (fields: FormField[]) => {
    const schema: any = {};

    fields.forEach((field) => {
      let fieldSchema: any;

      switch (field.type) {
        case "email":
          fieldSchema = z.string().email("Invalid email address");
          break;
        case "number":
          fieldSchema = z.number();
          if (field.validation?.min !== undefined) {
            fieldSchema = fieldSchema.min(field.validation.min);
          }
          if (field.validation?.max !== undefined) {
            fieldSchema = fieldSchema.max(field.validation.max);
          }
          break;
        case "date":
          fieldSchema = z.string();
          break;
        case "file":
          fieldSchema = z.any();
          break;
        default:
          fieldSchema = z.string();
          if (field.validation?.min !== undefined) {
            fieldSchema = fieldSchema.min(field.validation.min);
          }
          if (field.validation?.max !== undefined) {
            fieldSchema = fieldSchema.max(field.validation.max);
          }
      }

      if (!field.required) {
        fieldSchema = fieldSchema.optional();
      }

      schema[field.name] = fieldSchema;
    });

    return z.object(schema);
  };

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: fields.length > 0 ? zodResolver(createSchema(fields)) : undefined,
  });

  useEffect(() => {
    const loadFormFields = async () => {
      try {
        setLoading(true);
        const params = role ? `?role=${role}` : "";
        const data = await apiFetch<{ fields: FormField[] }>(`/api/forms/${formType}${params}`);
        setFields(data.fields);
      } catch (error) {
        console.error("Failed to load form fields:", error);
        toast.error("Failed to load form");
      } finally {
        setLoading(false);
      }
    };

    loadFormFields();
  }, [formType, role]);

  const handleFormSubmit = async (data: any) => {
    try {
      setSubmitting(true);
      await onSubmit(data);
    } catch (error) {
      console.error("Form submission failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const fieldError = errors[field.name]?.message as string;

    switch (field.type) {
      case "textarea":
        return (
          <div key={field.name} className="grid gap-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              id={field.name}
              placeholder={field.placeholder}
              {...register(field.name)}
              className={fieldError ? "border-red-500" : ""}
            />
            {fieldError && (
              <p className="text-sm text-red-500">{fieldError}</p>
            )}
          </div>
        );

      case "select":
        return (
          <div key={field.name} className="grid gap-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Select onValueChange={(value) => setValue(field.name, value)}>
              <SelectTrigger className={fieldError ? "border-red-500" : ""}>
                <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldError && (
              <p className="text-sm text-red-500">{fieldError}</p>
            )}
          </div>
        );

      case "file":
        return (
          <div key={field.name} className="grid gap-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.name}
              type="file"
              accept={field.accept}
              multiple={field.multiple}
              {...register(field.name)}
              className={fieldError ? "border-red-500" : ""}
            />
            {fieldError && (
              <p className="text-sm text-red-500">{fieldError}</p>
            )}
          </div>
        );

      case "number":
        return (
          <div key={field.name} className="grid gap-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.name}
              type="number"
              placeholder={field.placeholder}
              {...register(field.name, { valueAsNumber: true })}
              className={fieldError ? "border-red-500" : ""}
            />
            {fieldError && (
              <p className="text-sm text-red-500">{fieldError}</p>
            )}
          </div>
        );

      case "date":
        return (
          <div key={field.name} className="grid gap-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.name}
              type="date"
              {...register(field.name)}
              className={fieldError ? "border-red-500" : ""}
            />
            {fieldError && (
              <p className="text-sm text-red-500">{fieldError}</p>
            )}
          </div>
        );

      default:
        return (
          <div key={field.name} className="grid gap-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.name}
              type={field.type}
              placeholder={field.placeholder}
              {...register(field.name)}
              className={fieldError ? "border-red-500" : ""}
            />
            {fieldError && (
              <p className="text-sm text-red-500">{fieldError}</p>
            )}
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-muted animate-pulse rounded w-1/4"></div>
            <div className="h-10 bg-muted animate-pulse rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (fields.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No form fields available</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {fields.map(renderField)}

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Submitting..." : submitLabel}
      </Button>
    </form>
  );
}