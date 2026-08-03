import { useEffect } from "react";
import { useForm, UseFormReturn, FieldValues, DefaultValues } from "react-hook-form";

/** Wires a react-hook-form instance to an onDataChange callback, replacing the
 * `useForm + useEffect(watch -> onDataChange)` boilerplate repeated in every document form. */
export function useDocumentForm<T extends FieldValues>(
  initialData: T,
  onDataChange: (data: T) => void
): UseFormReturn<T> {
  const form = useForm<T>({ defaultValues: initialData as DefaultValues<T> });
  const { watch } = form;

  useEffect(() => {
    const subscription = watch((value) => onDataChange(value as T));
    return () => subscription.unsubscribe();
  }, [watch, onDataChange]);

  return form;
}
