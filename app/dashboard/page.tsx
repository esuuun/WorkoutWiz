"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import AddWorkout from "./_components/AddWorkout";
import WorkoutCard from "./_components/WorkoutCard";
import PricingModal from "./_components/PricingModal"; // Ensure this path is correct
import { Loader2Icon } from "lucide-react";

function Dashboard() {
  const [isSubscribed, setIsSubscribed] = useState(false
  ); 
  const [isLoading, setIsLoading] = useState(true); // Loading state for subscription check
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [hasClosedModal, setHasClosedModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const response = await axios.get("/api/check-subscription");
        console.log(response.data)
        if (response.status === 200 && response.data.message === 'Subscription is active' ) {
          setIsSubscribed(true);
        } else {
          setIsSubscribed(false);
        }
      } catch (error) {
        setIsSubscribed(false);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500)
      }
    };

    checkSubscription();
  }, []);

  useEffect(() => {
    if (!isLoading && !isSubscribed && !isModalOpen) {
      router.push('/');
    }
  }, [isLoading, isSubscribed,isModalOpen,router]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setHasClosedModal(true); // Mark the modal as closed
  };

  if (isLoading) {
    return (<div className="absolute inset-0 flex items-center justify-center bg-background bg-opacity-30">
    <Loader2Icon className="animate-spin" size={50} />
  </div>); 
  }

  return (
    <div className="flex flex-wrap md:m-10 gap-10 items-center">
      {isSubscribed ? (
        <>
          <AddWorkout />
          <WorkoutCard />
        </>
      ) : (
        <PricingModal isOpen={isModalOpen} onClose={handleModalClose} />
      )}
    </div>
  );
}

export default Dashboard;
