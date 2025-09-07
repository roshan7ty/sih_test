import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Bell, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";

export default function AlertsPreview({ alerts }) {
  const severityColors = {
    low: "bg-blue-100 text-blue-800 border-blue-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    high: "bg-orange-100 text-orange-800 border-orange-200",
    critical: "bg-red-100 text-red-800 border-red-200"
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-red-500">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-800">
            <Bell className="w-5 h-5 text-red-600" />
            Active Alerts
          </div>
          {alerts?.length > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              {alerts.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {alerts?.length > 0 ? (
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-l-red-500 rounded-r-lg">
                <div className="flex items-start justify-between mb-2">
                  <Badge className={`${severityColors[alert.severity]} border text-xs`}>
                    {alert.severity.toUpperCase()}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {format(new Date(alert.created_date), 'MMM d, HH:mm')}
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {alert.title}
                </h4>
                <p className="text-sm text-gray-700 mb-2">
                  {alert.message}
                </p>
                {alert.action_required && (
                  <p className="text-xs font-medium text-red-700 bg-red-100 px-2 py-1 rounded">
                    Action Required: {alert.action_required}
                  </p>
                )}
              </div>
            ))}
            <Link to={createPageUrl("Alerts")}>
              <Button variant="outline" className="w-full mt-4 border-red-200 text-red-700 hover:bg-red-50">
                View All Alerts
              </Button>
            </Link>
          </div>
        ) : (
          <div className="text-center py-6">
            <AlertTriangle className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <h3 className="font-medium text-gray-700 mb-2">All Clear</h3>
            <p className="text-gray-500 text-sm">
              No active alerts in your region
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}