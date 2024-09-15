import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SomeoneElseFundraisingForm from '@/components/event/SomeOneElseForm';
import IndividualFundraisingForm from '@/components/event/IndividualForm';

export default function FundraisingForm() {
    const [fundraisingFor, setFundraisingFor] = useState("self");


    return (
        <div className="min-h-screen bg-blue-50 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-8">
                    <h1 className="text-3xl font-bold mb-8 text-gray-900">Start Your Fundraising Journey!</h1>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">Who are you fundraising for?</h2>
                        <RadioGroup value={fundraisingFor} onValueChange={setFundraisingFor}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="self" id="self" />
                                <Label htmlFor="self" className="text-gray-900">Myself</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="other" id="other" />
                                <Label htmlFor="other" className="text-gray-900">Someone else</Label>
                            </div>
                        </RadioGroup>
                    </section>

                    {fundraisingFor === "self" ? <IndividualFundraisingForm /> : <SomeoneElseFundraisingForm />}


                </div>
            </div>
        </div>
    );
}
