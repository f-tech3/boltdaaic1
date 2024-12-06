import React from 'react';

interface TagListProps {
  tags: string[];
}

export const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent p-4 z-10">
      <div className="flex flex-wrap gap-1.5">
        {tags.slice(1).map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-slate-900 dark:text-white flex items-center gap-1"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};