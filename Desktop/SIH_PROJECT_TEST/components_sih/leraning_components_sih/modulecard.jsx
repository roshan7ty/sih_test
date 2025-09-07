import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  CheckCircle, 
  Clock, 
  Star,
  Trophy
} from "lucide-react";

export default function ModuleCard({ module, isCompleted, onSelect }) {
  const categoryColors = {
    earthquake: "bg-amber-100 text-amber-800 border-amber-200",
    fire: "bg-red-100 text-red-800 border-red-200",
    flood: "bg-blue-100 text-blue-800 border-blue-200",
    tornado: "bg-purple-100 text-purple-800 border-purple-200",
    hurricane: "bg-gray-100 text-gray-800 border-gray-200",
    general_safety: "bg-green-100 text-green-800 border-green-200"
  };

  const difficultyColors = {
    beginner: "bg-green-50 text-green-700 border-green-200",
    intermediate: "bg-yellow-50 text-yellow-700 border-yellow-200",
    advanced: "bg-red-50 text-red-700 border-red-200"
  };

  return (
    <Card className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 ${
      isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:border-blue-300'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-3">
          <Badge className={`${categoryColors[module.category]} border text-xs`}>
            {module.category.replace('_', ' ')}
          </Badge>
          {isCompleted && (
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs font-medium">Completed</span>
            </div>
          )}
        </div>
        
        <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
          {module.title}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-3 mt-2">
          {module.description}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {module.estimated_duration}min
            </div>
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              {module.points_reward} pts
            </div>
          </div>
          <Badge className={`${difficultyColors[module.difficulty_level]} border text-xs`}>
            {module.difficulty_level}
          </Badge>
        </div>

        <Button 
          onClick={() => onSelect(module)}
          className={`w-full group-hover:scale-105 transition-transform duration-200 ${
            isCompleted 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Review Module
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Start Learning
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}