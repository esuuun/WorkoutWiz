"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@clerk/nextjs";
import { ProgressBar } from "@/components/ui/slider";
import axios from "axios";
import { CheckCircle2, Dumbbell, EllipsisVertical } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Workout {
  id: string;
  title: string;
  progress: number;
  days: any[];
}

function WorkoutCard() {
  const { isLoaded, userId } = useAuth();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [newWorkoutName, setNewWorkoutName] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    if (!isLoaded || !userId) return;

    const fetchWorkouts = async () => {
      try {
        const response = await axios.get("/api/workout/get");
        setWorkouts(response.data);

        const initialProgress = response.data.reduce((acc: { [key: string]: number }, workout: Workout) => {
          acc[workout.id] = workout.progress || 0;
          return acc;
        }, {});
        setProgress(initialProgress);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchWorkouts();
  }, [isLoaded, userId]);

  if (loading) {
    return (
      <div className="flex w-full md:w-fit justify-center">
        <Skeleton className="w-32 h-32" />
      </div>
    );
  }

  const handleDeleteClick = (workout: Workout) => {
    setSelectedWorkout(workout);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedWorkout(null);
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      await axios.delete("/api/workout/delete", {
        data: { workoutId: selectedWorkout?.id },
      });
      console.log(`Workout ${selectedWorkout?.id} deleted successfully`);
      const response = await axios.get("/api/workout/get");
      setWorkouts(response.data);
      toast({
        title: "Your Workout Successfully Deleted!",
      });
    } catch (error) {
      console.error("Error deleting workout:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setDialogOpen(false);
      setLoading(false);
    }
  };

  const handleRenameDialogOpen = (workout: Workout) => {
    setSelectedWorkout(workout);
    setNewWorkoutName(workout.title); // Initialize input with current workout title
    setRenameDialogOpen(true);
  };

  const handleRenameDialogClose = () => {
    setRenameDialogOpen(false);
    setSelectedWorkout(null);
    setNewWorkoutName("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewWorkoutName(e.target.value);
  };

  const handleRenameConfirm = async () => {
    setLoading(true);
    try {
      await axios.post("/api/workout/rename", {
        workoutId: selectedWorkout?.id,
        newTitle: newWorkoutName,
      });
      console.log(`Workout ${selectedWorkout?.id} renamed successfully`);
      const response = await axios.get("/api/workout/get");
      setWorkouts(response.data);
      toast({
        title: "Your Workout Successfully Renamed!",
      });
    } catch (error) {
      console.error("Error renaming workout:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setRenameDialogOpen(false);
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full md:w-fit gap-10 flex-wrap justify-center">
      {workouts.length > 0 ? (
        workouts.map((workout) => (
          <div
            key={workout.id}
            className="flex justify-center flex-col hover:scale-105 transition-all ease-in-out cursor-pointer"
          >
            <div className="flex justify-center w-full bg-transparent">
              <Dumbbell className="w-16 h-16 bg-primary p-2 rounded-lg translate-y-5" />
              <DropdownMenu>
                <DropdownMenuTrigger className="absolute translate-x-28 translate-y-20 text-muted">
                  <EllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => handleRenameDialogOpen(workout)}>
                    Rename 
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleDeleteClick(workout)}>
                    Delete Workout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Link href={`/dashboard/workout/${workout.id}`}>
              <Card className="w-64 h-fit text-center ">
                <CardHeader>
                  <CardTitle>{workout.title}</CardTitle>
                  <CardDescription>
                    {workout.days.length}x / week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{workout.progress}%</span>
                  </div>
                  <ProgressBar
                    value={[progress[workout.id]]}
                    className="mt-2 "
                  />
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </Link>
          </div>
        ))
      ) : (
        <div>No workouts available</div>
      )}

      <AlertDialog open={dialogOpen} onOpenChange={handleDialogClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              workout and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDialogClose} className="ring-0">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={renameDialogOpen} onOpenChange={handleRenameDialogClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rename Workout</DialogTitle>
            <DialogDescription>
              Make changes to your workout name. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-4">
              <Input value={newWorkoutName} onChange={handleInputChange} className="w-full" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleRenameConfirm}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default WorkoutCard;
