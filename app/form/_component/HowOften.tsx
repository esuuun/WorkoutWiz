"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AirVent, Icon, icons, Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import useFormStore from "@/store/formStore";
import Link from "next/link";
import { chatSession } from "@/utils/AiModel";
import prompt from "@/app/_aiPrompt/Prompt";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import PricingModal from "@/app/dashboard/_components/PricingModal";

interface FormData {
  goal: string;
  gender: string;
  level: string;
  height: string;
  weight: string;
  howOften: string;
  where: string;
  additionalProblem: string;
}

function HowOften() {
  const { formData, setFormData } = useFormStore();
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/check-subscription");
        if (response.status === 200) {
          setIsSubscribed(true);
        }
      } catch (error) {
        setIsSubscribed(false);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };
    checkSubscription();
  }, []);

  const HowOftenList = [
    {
      name: "1 days/week",
      icon: "",
    },
    {
      name: "2 days/week",
      icon: "",
    },
    {
      name: "3 days/week",
      icon: "",
    },
    {
      name: "4 days/week",
      icon: "",
    },
    {
      name: "5 days/week",
      icon: "",
    },
    {
      name: "6 days/week",
      icon: "",
    },
    {
      name: "7 days/week",
      icon: "",
    },
  ];

  const generateAi = async (updatedFormData: FormData) => {
    setLoading(true);
    const { goal, gender, level, height, weight, howOften, where } =
      updatedFormData;
    const finalAiPrompt = prompt({
      goal: updatedFormData.goal,
      gender: updatedFormData.gender,
      level: updatedFormData.level,
      height: parseFloat(updatedFormData.height), // Ensure height is a number
      weight: parseFloat(updatedFormData.weight), // Ensure weight is a number
      howOften: updatedFormData.howOften,
      where: updatedFormData.where,
      additionalProblem: updatedFormData.additionalProblem,
    });
    const aiResponse = await chatSession.sendMessage(finalAiPrompt);

    try {
      // console.log(
      //   "Ai Response:",
      //   aiResponse.response.candidates[0].content.parts[0].text
      // );
      const jsonStringMatch =
        aiResponse.response.candidates[0].content.parts[0].text.match(
          /```json\n([\s\S]*?)\n```/
        );
      if (jsonStringMatch && jsonStringMatch[1]) {
        const jsonString = jsonStringMatch[1];

        console.log(aiResponse.usageMetadata);
        // console.log("Extracted JSON String:", jsonString);
        try {
          const workoutPlan = JSON.parse(jsonString);
          // console.log("Parsed workout plan:", workoutPlan);

          // push to database
          try {
            const response = await axios.post("/api/workout/new", workoutPlan);
            console.log("Workout Created:", response);
            toast({
              title: "Your workout has been created!",
            });
            router.push(`/dashboard/workout/${response.data.id}`);
          } catch (error) {
            console.error("Error creating workout:", error);
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description:
                "There was a problem with your request. Try again later!",
            });
            router.push("/dashboard");
          }
        } catch (parseError) {
          console.error("Error parsing JSON from AI response:", parseError);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description:
              "There was a problem with your request. Try again later!",
          });
          router.push("/dashboard");
        }
      } else {
        console.error("No JSON found in the AI response.");
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            "There was a problem with your request. Try again later!",
        });
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error handling AI response:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Try again later!",
      });
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async (name: string) => {
    if (!isSubscribed) {
      setIsModalOpen(true);
      return;
    }

    const updatedFormData = { ...formData, howOften: name };
    setFormData(updatedFormData);
    // console.log(updatedFormData);

    await generateAi(updatedFormData);
  };

  return (
    <div>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background bg-opacity-30">
          <Loader2Icon className="animate-spin" size={50} />
        </div>
      )}
      <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-4xl">
        How often you want to workout?
      </h1>
      <div className="flex gap-3 justify-center flex-wrap">
        {HowOftenList.map((howOften, index) => (
          <div key={index}>
            <button className="mt-4" onClick={() => handleClick(howOften.name)}>
              <Card className="hover:bg-muted">
                <CardHeader>
                  <CardTitle>{howOften.name}</CardTitle>
                </CardHeader>
              </Card>
            </button>
          </div>
        ))}
      </div>
      <PricingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default HowOften;
