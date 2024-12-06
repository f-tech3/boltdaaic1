import React from 'react';
import { getPrimaryCategoryInfo } from '../../utils/categoryUtils';

interface CategoryBadgeProps {
  tags: string[];
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ tags }) => {
  const primaryCategoryInfo = getPrimaryCategoryInfo(tags);
  const CategoryIcon = primaryCategoryInfo.icon;

  return (
    <div className="absolute top-4 right-16 z-10">
      <div className={`px-3 py-1.5 rounded-xl bg-gradient-to-r ${primaryCategoryInfo.gradient} text-white text-sm font-medium shadow-lg flex items-center gap-2`}>
        <CategoryIcon className="w-3 h-3" />
        {primaryCategoryInfo.label}
      </div>
    </div>
  );
};