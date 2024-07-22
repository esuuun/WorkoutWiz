"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { ProgressBar } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { Check, CircleCheckBig, Dumbbell, ListChecks, Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import BackButton from "../../_components/BackButton";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  completed: boolean;
}

interface Day {
  id: string;
  dayNumber: number;
  exercises: Exercise[];
}

interface Workout {
  id: string;
  title: string;
  progress: number;
  days: Day[];
}

interface WorkoutProps {
  workoutId: string;
}

const WorkoutPage = ({ params }: { params: WorkoutProps }) => {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await axios.get(`/api/workout/${params.workoutId}`);
        setWorkout(response.data);
        setProgress(response.data.progress);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkout();
  }, [params.workoutId]);

  const calculateProgress = (data: Workout) => {
    let totalExercises = 0;
    let completedExercises = 0;

    data.days.forEach((day) => {
      totalExercises += day.exercises.length;
      day.exercises.forEach((exercise) => {
        if (exercise.completed) {
          completedExercises++;
        }
      });
    });

    if (totalExercises > 0) {
      const newProgress = (completedExercises / totalExercises) * 100;
      setProgress(newProgress);
    } else {
      setProgress(0);
    }
  };

  const handleCheckboxChange = (dayIndex: number, exerciseIndex: number) => {
    const updatedWorkout = {
      ...workout!,
      days: workout!.days.map((day, dIndex) => {
        if (dIndex === dayIndex) {
          return {
            ...day,
            exercises: day.exercises.map((exercise, eIndex) => {
              if (eIndex === exerciseIndex) {
                return {
                  ...exercise,
                  completed: !exercise.completed,
                };
              }
              return exercise;
            }),
          };
        }
        return day;
      }),
    };
    setWorkout(updatedWorkout);
    calculateProgress(updatedWorkout);
  };

  const saveWorkout = async (updatedWorkout: Workout) => {
    setLoading(true);

    try {
      const response = await axios.post(`/api/workout/${params.workoutId}`, {
        progress: Number(progress.toFixed(0)),
        days: updatedWorkout.days.map((day) => ({
          id: day.id,
          exercises: day.exercises.map((exercise) => ({
            id: exercise.id,
            completed: exercise.completed,
          })),
        })),
      });
      console.log("Workout saved successfully:", response.data);
      toast({
        title: "Your workout saved successfully!",
      });
    } catch (error) {
      console.error("Error saving workout:", error);
      toast({
        title: "Error saving your workout",
        description: "Try again later!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!workout) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2Icon className="animate-spin" size={50} />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-14 h-screen">
      <Card className="h-full">
        <ScrollArea className="h-full pt-4">
          <CardHeader>
            <div className="flex justify-between flex-wrap md:flex-nowrap">
              <div>
                <Dumbbell className="w-20 h-20 bg-primary p-2 rounded-lg -translate-y-4 translate-x-4 drop-shadow-lg" />
                <CardTitle className="text-4xl">{workout.title}</CardTitle>
              </div>
              <div className="w-full max-w-xl">
                <div className="flex justify-between">
                  <span>Progress</span>
                  <span>{progress.toFixed(0)}%</span>
                </div>
                <ProgressBar value={[progress]} className="mt-2" />
              </div>
            </div>
            <div className="pt-3">
              <Button className="w-fit" onClick={() => saveWorkout(workout)}>
                {loading ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  <span className="flex">
                    Save Progress <CircleCheckBig className="ml-2" size={18} />
                  </span>
                )}
              </Button>
            </div>
            <div className="mt-2">
              <div className="bg-muted w-full h-1 mt-5 rounded-sm"></div>
            </div>
          </CardHeader>

          <CardContent>
            {workout.days.map((day, dayIndex) => (
              <div key={dayIndex} className="mt-8">
                <span className="text-2xl font-semibold">
                  Day {day.dayNumber}{" "}
                </span>
                <div>
                  {day.exercises.map((exercise, exerciseIndex) => (
                    <div
                      className="flex gap-x-8 gap-y-3 mt-3 items-center flex-wrap"
                      key={exerciseIndex}
                    >
                      <Checkbox
                        checked={exercise.completed}
                        onCheckedChange={() =>
                          handleCheckboxChange(dayIndex, exerciseIndex)
                        }
                      />
                      <span
                        className={`font-medium ${
                          exercise.completed ? "line-through text-muted" : ""
                        }`}
                      >
                        {exercise.name}
                      </span>
                      <Badge>Sets: {exercise.sets}</Badge>
                      <Badge variant={"secondary"}>Reps: {exercise.reps}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default WorkoutPage;
