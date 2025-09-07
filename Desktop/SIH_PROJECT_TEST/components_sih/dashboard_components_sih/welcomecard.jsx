import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function WelcomeCard({ user, userProgress, calculateLevel }) {
  const currentLevel = calculateLevel(userProgress?.total_points || 0);

  return (
    <Card className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white border-none shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-8 -translate-y-8"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full transform -translate-x-4 translate-y-4"></div>
      
      <CardContent className="p-8 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome back, {user?.full_name?.split(' ')[0] || 'Student'}!
              </h1>
              <Badge className="bg-white/20 text-white hover:bg-white/30 border-white/30">
                Level {currentLevel}
              </Badge>
            </div>
            <p className="text-orange-100 text-lg mb-4">
              Ready to improve your disaster preparedness skills?
            </p>
            <div className="flex items-center gap-4 text-sm text-orange-100">
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                <span>{userProgress?.total_points || 0} Points</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>{userProgress?.modules_completed?.length || 0} Modules Completed</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to={createPageUrl("Learning")}>
              <Button className="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-6 py-2 shadow-lg">
                Continue Learning
              </Button>
            </Link>
            <Link to={createPageUrl("Drills")}>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 font-medium px-6 py-2"
              >
                Take Drill
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}