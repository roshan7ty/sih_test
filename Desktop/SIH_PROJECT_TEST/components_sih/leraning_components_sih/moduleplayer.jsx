import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Trophy,
  Clock,
  Book
} from "lucide-react";

import QuizSection from "./QuizSection";

export default function ModulePlayer({ module, onComplete, onBack, userProgress }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState(new Set());
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScores, setQuizScores] = useState({});

  const sections = module.content?.sections || [];
  const isCompleted = userProgress?.modules_completed?.includes(module.id);
  const progress = ((currentSection + 1) / sections.length) * 100;

  const handleSectionComplete = () => {
    const newCompleted = new Set(completedSections);
    newCompleted.add(currentSection);
    setCompletedSections(newCompleted);

    if (sections[currentSection]?.quiz_questions?.length > 0) {
      setShowQuiz(true);
    } else {
      goToNextSection();
    }
  };

  const handleQuizComplete = (score) => {
    setQuizScores({ ...quizScores, [currentSection]: score });
    setShowQuiz(false);
    goToNextSection();
  };

  const goToNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      // Module completed
      const averageQuizScore = Object.values(quizScores).reduce((a, b) => a + b, 0) / Object.keys(quizScores).length || 100;
      const bonusPoints = averageQuizScore >= 80 ? 50 : averageQuizScore >= 60 ? 25 : 0;
      onComplete(module.id, module.points_reward + bonusPoints);
    }
  };

  const goToPrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setShowQuiz(false);
    }
  };

  if (sections.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl">
            <CardContent className="p-8 text-center">
              <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Module Content Not Available
              </h3>
              <p className="text-gray-500 mb-6">
                This module doesn't have content sections yet.
              </p>
              <Button onClick={onBack} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Learning
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Learning
              </Button>
              {isCompleted && (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
            <div className="mt-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {module.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {module.estimated_duration} minutes
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4" />
                  {module.points_reward} points
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{currentSection + 1} of {sections.length} sections</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Content */}
        {showQuiz ? (
          <QuizSection
            questions={sections[currentSection].quiz_questions}
            onComplete={handleQuizComplete}
            sectionTitle={sections[currentSection].title}
          />
        ) : (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{sections[currentSection]?.title}</span>
                <Badge variant="outline">
                  Section {currentSection + 1}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {sections[currentSection]?.image_url && (
                <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={sections[currentSection].image_url}
                    alt={sections[currentSection].title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ 
                  __html: sections[currentSection]?.content?.replace(/\n/g, '<br>') 
                }} />
              </div>

              <div className="flex justify-between pt-6">
                <Button 
                  variant="outline" 
                  onClick={goToPrevSection}
                  disabled={currentSection === 0}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                <Button 
                  onClick={handleSectionComplete}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {currentSection === sections.length - 1 ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete Module
                    </>
                  ) : (
                    <>
                      Next Section
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}