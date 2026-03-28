import { useState } from "react";
import { MOCK_CATEGORIES } from "@lib/mock/categories";

export function useCategoryDetail(categoryId: string) {
  const isNew = categoryId === "new";
  const category = isNew ? null : (MOCK_CATEGORIES.find((c) => c.id === categoryId) ?? null);

  const [saved, setSaved] = useState(false);

  if (!isNew && !category) return null;

  const rootCategories = MOCK_CATEGORIES.filter(
    (c) => c.parentId === null && c.id !== categoryId,
  );

  const handleSave = () => {
    // Persist to mock data would happen here via an API call
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return {
    category,
    isNew,
    rootCategories,
    saved,
    handleSave,
  };
}
