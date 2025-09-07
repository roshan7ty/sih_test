import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const categories = [
    { id: "all", label: "All Categories", icon: "🏠" },
    { id: "earthquake", label: "Earthquake", icon: "🌍" },
    { id: "fire", label: "Fire Safety", icon: "🔥" },
    { id: "flood", label: "Flood", icon: "🌊" },
    { id: "tornado", label: "Tornado", icon: "🌪️" },
    { id: "hurricane", label: "Hurricane", icon: "🌀" },
    { id: "general_safety", label: "General Safety", icon: "🛡️" }
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
            selectedCategory === category.id 
              ? 'bg-blue-600 text-white shadow-lg scale-105' 
              : 'bg-white hover:bg-blue-50 text-gray-700 border-gray-200'
          }`}
        >
          <span className="text-sm">{category.icon}</span>
          <span className="font-medium">{category.label}</span>
        </Button>
      ))}
    </div>
  );
}