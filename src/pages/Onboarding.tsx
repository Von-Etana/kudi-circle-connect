
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Footer from "@/components/Footer";

const steps = [
  { label: "Demography" },
  { label: "Geography" },
  { label: "Summary" },
];

type DemographyForm = {
  fullName: string;
  age: string;
  gender: string;
  occupation: string;
};

type GeographyForm = {
  country: string;
  state: string;
  city: string;
};

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [demography, setDemography] = useState<DemographyForm>({
    fullName: "",
    age: "",
    gender: "",
    occupation: "",
  });
  const [geography, setGeography] = useState<GeographyForm>({
    country: "",
    state: "",
    city: "",
  });

  // Handle step navigation
  const next = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  // Handlers for input changes
  const handleDemographyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setDemography({ ...demography, [e.target.name]: e.target.value });
  };

  const handleGeographyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setGeography({ ...geography, [e.target.name]: e.target.value });
  };

  // Submit (later: save to db)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: submit to backend
    alert("Onboarding complete! 🎉");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-emerald-50 via-white to-green-50">
      <main className="flex-grow flex flex-col items-center justify-center py-8">
        <Card className="w-full max-w-lg shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl">{steps[currentStep].label}</CardTitle>
            <div className="flex gap-2 mt-2">
              {steps.map((step, idx) => (
                <div
                  key={step.label}
                  className={`w-3 h-3 rounded-full ${
                    idx === currentStep
                      ? "bg-emerald-600"
                      : "bg-emerald-100"
                  }`}
                />
              ))}
            </div>
            <Progress value={((currentStep + 1) / steps.length) * 100} className="mt-4" />
          </CardHeader>
          <CardContent>
            {currentStep === 0 && (
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); next(); }}>
                <div>
                  <label htmlFor="fullName" className="block mb-1 text-base font-medium">Full Name</label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    required
                    value={demography.fullName}
                    onChange={handleDemographyChange}
                  />
                </div>
                <div>
                  <label htmlFor="age" className="block mb-1 text-base font-medium">Age</label>
                  <Input
                    id="age"
                    name="age"
                    placeholder="Enter your age"
                    type="number"
                    min="1"
                    max="120"
                    required
                    value={demography.age}
                    onChange={handleDemographyChange}
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="block mb-1 text-base font-medium">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    required
                    value={demography.gender}
                    onChange={handleDemographyChange}
                    className="w-full border rounded px-3 py-2 text-base"
                  >
                    <option value="">Select gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                    <option value="prefer_not">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="occupation" className="block mb-1 text-base font-medium">Occupation</label>
                  <Input
                    id="occupation"
                    name="occupation"
                    placeholder="E.g. Teacher, Engineer"
                    required
                    value={demography.occupation}
                    onChange={handleDemographyChange}
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">Next</Button>
                </div>
              </form>
            )}
            {currentStep === 1 && (
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); next(); }}>
                <div>
                  <label htmlFor="country" className="block mb-1 text-base font-medium">Country</label>
                  <Input
                    id="country"
                    name="country"
                    placeholder="E.g. Nigeria"
                    required
                    value={geography.country}
                    onChange={handleGeographyChange}
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block mb-1 text-base font-medium">State</label>
                  <Input
                    id="state"
                    name="state"
                    placeholder="E.g. Lagos"
                    required
                    value={geography.state}
                    onChange={handleGeographyChange}
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block mb-1 text-base font-medium">City</label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="E.g. Ikeja"
                    required
                    value={geography.city}
                    onChange={handleGeographyChange}
                  />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" type="button" onClick={prev}>Back</Button>
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">Next</Button>
                </div>
              </form>
            )}
            {currentStep === 2 && (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="mb-2 font-bold text-emerald-800">Review your details</div>
                <div className="text-sm">
                  <div><span className="font-medium">Full Name:</span> {demography.fullName}</div>
                  <div><span className="font-medium">Age:</span> {demography.age}</div>
                  <div><span className="font-medium">Gender:</span> {demography.gender}</div>
                  <div><span className="font-medium">Occupation:</span> {demography.occupation}</div>
                  <div><span className="font-medium">Country:</span> {geography.country}</div>
                  <div><span className="font-medium">State:</span> {geography.state}</div>
                  <div><span className="font-medium">City:</span> {geography.city}</div>
                </div>
                <div className="flex justify-between mt-6">
                  <Button variant="outline" type="button" onClick={prev}>Back</Button>
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">Finish</Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
