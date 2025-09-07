import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, X, Trophy } from "lucide-react";

export default function QuizSection({ questions, onComplete, sectionTitle }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    });
  };

  const handleSubmitQuiz = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);
  };

  const handleComplete = () => {
    onComplete(score);
  };

  if (showResults) {
    return (
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
          <p className="text-gray-600">{sectionTitle}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {score}%
            </div>
            <Badge className={`text-lg px-4 py-1 ${
              score >= 80 ? 'bg-green-100 text-green-800' : 
              score >= 60 ? 'bg-yellow-100 text-yellow-800' : 
              'bg-red-100 text-red-800'
            }`}>
              {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good Job!' : 'Keep Learning!'}
            </Badge>
            {score >= 80 && (
              <p className="text-sm text-gray-600 mt-2">
                🎉 Bonus points earned for excellent performance!
              </p>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Quiz Review:</h3>
            {questions.map((question, qIndex) => (
              <div key={qIndex} className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900 mb-2">
                  {qIndex + 1}. {question.question}
                </p>
                <div className="space-y-1">
                  {question.options.map((option, oIndex) => (
                    <div 
                      key={oIndex}
                      className={`p-2 rounded text-sm flex items-center gap-2 ${
                        oIndex === question.correct_answer 
                          ? 'bg-green-100 text-green-800' 
                          : selectedAnswers[qIndex] === oIndex && oIndex !== question.correct_answer
                          ? 'bg-red-100 text-red-800'
                          : 'text-gray-600'
                      }`}
                    >
                      {oIndex === question.correct_answer ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : selectedAnswers[qIndex] === oIndex && oIndex !== question.correct_answer ? (
                        <X className="w-4 h-4 text-red-600" />
                      ) : (
                        <div className="w-4 h-4" />
                      )}
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Button 
            onClick={handleComplete}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Continue to Next Section
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (currentQuestion < questions.length) {
    const question = questions[currentQuestion];
    
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Section Quiz</CardTitle>
            <Badge variant="outline">
              Question {currentQuestion + 1} of {questions.length}
            </Badge>
          </div>
          <p className="text-gray-600">{sectionTitle}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {question.question}
            </h3>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestion, index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswers[currentQuestion] === index && (
                        <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            
            {currentQuestion === questions.length - 1 ? (
              <Button
                onClick={handleSubmitQuiz}
                disabled={!selectedAnswers.hasOwnProperty(currentQuestion)}
                className="bg-green-600 hover:bg-green-700"
              >
                Submit Quiz
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                disabled={!selectedAnswers.hasOwnProperty(currentQuestion)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next Question
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}