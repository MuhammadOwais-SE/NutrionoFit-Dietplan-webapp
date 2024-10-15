"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import TypedHTMLContent from "./TypedHTMLContent";
import Image from "next/image";
import NutrinoFitLogo from "../../public/assets/NutrinoFit-logo.svg";

interface UserData {
  name: string;
  age: string;
  height: string;
  weight: string;
  gender: string;
  diet: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
  };
  goal: string;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
    diet: {
      breakfast: [""],
      lunch: [""],
      dinner: [""],
    },
    goal: "",
  });
  
  const [dietSuggestion, setDietSuggestion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setDietSuggestion(data.dietSuggestion);
      } else {
        throw new Error(data.message || "An error occurred");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDietChange = (meal: keyof UserData["diet"], value: string) => {
    setUserData((prevState) => ({
      ...prevState,
      diet: {
        ...prevState.diet,
        [meal]: value.split(",").map((item) => item.trim()),
      },
    }));
  };

  const parseDietSuggestion = (text: string) => {
    const formattedText = text
      // Handle headers
      .replace(/^(#{1,3})\s*(.*)$/gm, (match, hashes, content) => {
        const level = hashes.length;
        return `<h${level}>${content.trim()}</h${level}>`;
      })
      // Handle bold text
      .replace(/\*\*(.*?)\*\*/g, (match, content) => `<strong>${content}</strong>`)
      // Handle list items
      .replace(/^\*\s*(.*)$/gm, (match, content) => `<li>${content.trim()}</li>`)
      // Handle paragraphs
      .replace(/^(?!<h[1-3]|<li|<ul|<ol)(.+)$/gm, (match, content) => `<p>${content.trim()}</p>`)
      // Wrap adjacent list items in <ul> tags
      .replace(/(<li>.*?<\/li>(\s*<li>.*?<\/li>)*)/g, match => `<ul>${match}</ul>`)
      // Handle line breaks
      .replace(/\n{2,}/g, '</p><p>');
  
    // Wrap the entire content in a div for easier styling
    return `<div class="diet-suggestion">${formattedText}</div>`;
  };
  return (
    <div className="container mx-auto p-4 max-w-3xl ">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-6 bg-green-100  ring-2 ring-offset-1 hover:ring-offset-4 shadow-[0_0_10px_rgba(0,128,0,200)] hover:shadow-[0_0_20px_rgba(0,128,0,200)] ring-green-300 duration-300 transition-all">
        <CardHeader>
          <CardTitle className="text-2xl font-bold w-full font-serif mx-auto text-center">
            


            <Image 
            src={NutrinoFitLogo}
            width={100}
            height={100}
            alt="NutrinoFit Logo"
            className="w-32"
            />
            <span className="text-emerald-800">
               Diet Plan
               Application
              </span>
            
            
            </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={userData.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (Ft)</Label>
                <Input
                  id="height"
                  name="height"
                  type="number"
                  value={userData.height}
                  onChange={handleChange}
                  placeholder="Height"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  value={userData.weight}
                  onChange={handleChange}
                  placeholder="Weight"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select name="gender" value={userData.gender} onValueChange={(value) => handleChange({ target: { name: 'gender', value } } as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">Fitness Goal</Label>
              <Select name="goal" value={userData.goal} onValueChange={(value) => handleChange({ target: { name: 'goal', value } } as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Weight Loss">Weight Loss</SelectItem>
                  <SelectItem value="Muscle Gain">Muscle Gain</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-semibold">Current Diet Plan</Label>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="breakfast">Breakfast</Label>
                  <Input
                    id="breakfast"
                    name="breakfast"
                    value={userData.diet.breakfast.join(", ")}
                    onChange={(e: any) => handleDietChange("breakfast", e.target.value)}
                    placeholder="Comma-separated"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lunch">Lunch</Label>
                  <Input
                    id="lunch"
                    name="lunch"
                    value={userData.diet.lunch.join(", ")}
                    onChange={(e: any) => handleDietChange("lunch", e.target.value)}
                    placeholder="Comma-separated"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dinner">Dinner</Label>
                  <Input
                    id="dinner"
                    name="dinner"
                    value={userData.diet.dinner.join(", ")}
                    onChange={(e: any) => handleDietChange("dinner", e.target.value)}
                    placeholder="Comma-separated"
                  />
                </div>
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full bg-[#68AC31] hover:bg-[#5f9632]">
              {isLoading ? "Generating Diet Plan..." : "Generate Diet Plan"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
    
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Alert variant="destructive" className="mb-">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}
      
      {dietSuggestion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}

        >
          <Card className="bg-green-100">
            
            <CardContent className="bg-lime-100- border-4 border-teal-500 rounded-md ">
              <div className="diet-suggestion-content">
                <TypedHTMLContent 
                  html={parseDietSuggestion(dietSuggestion)} 
                  speed={0.01}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
  );
}