class Category {
  id: string;
  name: string;
  childsCategories: Category[];
}

class MoveCategoryRequest {
  sourceCategoryId: string;
  newParentCategoryId: string;
}

export { Category, MoveCategoryRequest };
