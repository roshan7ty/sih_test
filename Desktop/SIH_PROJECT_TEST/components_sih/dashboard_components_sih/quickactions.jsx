import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Play, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function QuickActions({ recentModules }) {
  const categoryColors = {
    earthquake: "bg-amber-100 text-amber-800 border-amber-200",
    fire: "bg-red-100 text-red-800 border-red-200",
    flood: "bg-blue-100 text-blue-800 border-blue-200",
    tornado: "bg-purple-100 text-purple-800 border-purple-200",
    hurricane: "bg-gray-100 text-gray-800 border-gray-200",
    general_safety: "bg-green-100 text-green-800 border-green-200"
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Continue Learning
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {recentModules?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentModules.slice(0, 4).map((module) => (
              <div key={module.id} className="group p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <Badge className={`${categoryColors[module.category]} border text-xs`}>
                    {module.category.replace('_', ' ')}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {module.estimated_duration}min
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {module.title}
                </h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {module.description}
                </p>
                <Link to={createPageUrl(`Learning?module=${module.id}`)}>
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 group-hover:scale-[1.02] transition-transform duration-200">
                    <Play className="w-4 h-4 mr-2" />
                    Start Module
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-medium text-gray-700 mb-2">No learning modules available</h3>
            <p className="text-gray-500 text-sm">
              New educational content will appear here
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}