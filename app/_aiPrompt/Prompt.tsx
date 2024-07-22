import React from "react";

interface PromptProps {
  goal: string;
  gender: string;
  level: string;
  height: number;
  weight: number;
  howOften: string;
  where: string;
  additionalProblem: string;
}

function prompt(
  {goal,
  gender,
  level,
  height,
  weight,
  howOften,
  where,
  additionalProblem}: PromptProps
) {
  const promptText = `i want you to make me a workout with json that look exactly like this
    {
     "title": "${goal}",
    "progress" : 0,
     "days": [
      {
       "dayNumber": 1,
       "exercises": [
        { "name": "Exercise 1", "sets": 3, "reps": "8-10" },
        { "name": "Exercise 2", "sets": 3, "reps": "6-8" },
       ]
      },
      {
       "dayNumber": 2,
       "exercises": [
       { "name": "Exercise 1", "sets": 3, "reps": "8-10" },
        { "name": "Exercise 2", "sets": 3, "reps": "6-8" },
    { "name": "Exercise 3", "sets": 3, "reps": "6-8" }
       ]
      },
      // Additional days...
     ]
    }


    base on this input:
    my goal : ${goal}
    my gender : ${gender}
    my workout level : ${level}
    my height : ${height} cm
    my weight : ${weight} kg
    i want to workout at least ${howOften} 
    i usually workout at ${where}
    i have a problem : ${additionalProblem}
    
    i dont want any of it undefined
    `;

  return promptText;
}

export default prompt;
