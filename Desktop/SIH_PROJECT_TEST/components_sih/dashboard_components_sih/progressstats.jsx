import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, BookOpen, TrendingUp } from "lucide-react";

export default function ProgressStats({ userProgress, calculateLevel, getNextLevelPoints }) {
  const currentLevel = calculateLevel(userProgress?.total_points || 0);
  const nextLevelPoints = getNextLevelPoints(userProgress?.total_points || 0);
  const progressToNext = ((userProgress?.total_points || 0) % 500) / 5;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="bg-gradient-to-br from-green-100 to-emerald-100 border-green-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-green-800 text-sm font-medium">
            <Trophy className="w-4 h-4" />
            Total Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-700 mb-2">
            {userProgress?.total_points || 0}
          </div>
          <div className="text-xs text-green-600">
            {nextLevelPoints - (userProgress?.total_points || 0)} to next level
          </div>
          <Progress value={progressToNext} className="mt-2 h-1" />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-blue-800 text-sm font-medium">
            <BookOpen className="w-4 h-4" />
            Modules Completed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-700 mb-2">
            {userProgress?.modules_completed?.length || 0}
          </div>
          <div className="text-xs text-blue-600">
            Educational modules finished
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-100 to-violet-100 border-purple-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-purple-800 text-sm font-medium">
            <Target className="w-4 h-4" />
            Drills Completed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-700 mb-2">
            {userProgress?.drills_completed || 0}
          </div>
          <div className="text-xs text-purple-600">
            Avg Score: {userProgress?.average_drill_score || 0}%
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-100 to-yellow-100 border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-orange-800 text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            Preparedness Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-700 mb-2">
            {userProgress?.preparedness_score || 0}%
          </div>
          <div className="text-xs text-orange-600">
            Overall readiness level
          </div>
        </CardContent>
      </Card>
    </div>
  );
}