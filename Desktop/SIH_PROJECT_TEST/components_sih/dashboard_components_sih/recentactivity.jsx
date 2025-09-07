import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Clock, TrendingUp } from "lucide-react";
import { format } from "date-fns";

export default function RecentActivity({ recentDrills, userProgress }) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <Target className="w-5 h-5 text-orange-600" />
          Recent Drill Results
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {recentDrills?.length > 0 ? (
          <div className="space-y-4">
            {recentDrills.map((drill, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{drill.scenario_name}</h4>
                    <p className="text-sm text-gray-500 capitalize">{drill.drill_type.replace('_', ' ')} drill</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {format(new Date(drill.created_date), 'MMM d, yyyy')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    className={`mb-2 ${
                      drill.score >= 80 ? 'bg-green-100 text-green-800' : 
                      drill.score >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    {drill.score}%
                  </Badge>
                  <p className="text-xs text-gray-500">
                    {drill.completion_time}s
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-medium text-gray-700 mb-2">No drills completed yet</h3>
            <p className="text-gray-500 text-sm">
              Start with virtual drills to practice emergency scenarios
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}