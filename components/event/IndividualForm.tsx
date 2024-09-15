/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from 'react'
import { cn } from "@/lib/utils"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import validationMsg from "@/mock/validationMsg"
import * as yup from "yup"
import Sponsors from "./childforms/Sponsors"
import Merchandise from "./childforms/Merchandise"
import { social } from "@/typescript/event/events"

const schema = yup.object().shape({
    name: yup.string().required(validationMsg.error.name),
    email: yup.string().email().required(validationMsg.error.email),
    causeType: yup.string().when('otherCause', {
        is: (value: string) => !value,
        then: () => yup.string().required(validationMsg.error.causeType),
        otherwise: () => yup.string()
    }),
    otherCause: yup.string().when('causeType', {
        is: (value: string) => !value,
        then: () => yup.string().required(validationMsg.error.otherCause),
        otherwise: () => yup.string()
    }),
    eventName: yup.string().required(validationMsg.error.eventName),
    eventDescription: yup.string().required(validationMsg.error.eventDescription),
    eventMedia: yup.string().required(validationMsg.error.eventMedia),
    street: yup.string().required(validationMsg.error.street),
    city: yup.string().required(validationMsg.error.city),
    state: yup.string().required(validationMsg.error.state),
    zipCode: yup.string().required(validationMsg.error.zipCode),
    country: yup.string().required(validationMsg.error.country),
    goalAmount: yup.string().required(validationMsg.error.goal),
    facebook: yup.string().required(),
    twitter: yup.string().required(),
    instagram: yup.string().required(),
    linkedin: yup.string().required(),
    sponsorName: yup.string().required(validationMsg.error.sponsorName),
    sponsorCompany: yup.string().required(validationMsg.error.sponsorCompany),
    merchandiseField: yup.array().of(
        yup.object({
            name: yup.string().required(validationMsg.error.merchandiseName),
            company: yup.string().required(validationMsg.error.merchandiseCompany),
        })
    )
}, [['causeType', 'otherCause']])

export default function IndividualFundraisingForm() {
    const [activeTab, setActiveTab] = useState("donation");

    const methoods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            merchandiseField: [
                {
                    name: "",
                    company: ""
                }
            ]
        }
    });

    const { control, handleSubmit, watch, formState: { errors } } = methoods;

    const onSubmit = (data: any) => {
        console.log("submitData", data);
    }
    console.log(watch());
    console.log(errors);



    return (
        <div className="py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Start Your Individual Fundraising Journey!</h1>

            <FormProvider {...methoods}>
                <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">Your Details</h2>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="yourName" className="text-gray-900">Your Name</Label>
                                <Controller
                                    control={control}
                                    name="name"
                                    render={({ field }) => (
                                        <>
                                            <Input id="name" placeholder="Enter your name" className="text-gray-900" onChange={field.onChange} defaultValue={field.value} />
                                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                                        </>
                                    )}
                                />
                            </div>
                            <div>
                                <Label htmlFor="yourEmail" className="text-gray-900">Your Email</Label>
                                <Controller
                                    control={control}
                                    name="email"
                                    render={({ field }) => (
                                        <>
                                            <Input id="email" type="email" placeholder="Enter your email" className="text-gray-900" onChange={field.onChange} defaultValue={field.value} />
                                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">Event Details</h2>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="eventName" className="text-gray-900">Event Name</Label>
                                <Controller
                                    control={control}
                                    name="eventName"
                                    render={({ field }) => (
                                        <>
                                            <Input id="eventName" placeholder="Enter event name" className="text-gray-900" onChange={field.onChange} value={field.value} />
                                            {errors.eventName && <p className="text-red-500">{errors.eventName.message}</p>}
                                        </>
                                    )}
                                />
                            </div>
                            <div>
                                <Label htmlFor="eventDescription" className="text-gray-900">Event Description</Label>
                                <Controller
                                    control={control}
                                    name="eventDescription"
                                    render={({ field }) => (
                                        <>
                                            <Textarea id="eventDescription" placeholder="Enter event description" className="text-gray-900" onChange={field.onChange} value={field.value} />
                                            {errors.eventDescription && <p className="text-red-500">{errors.eventDescription.message}</p>}
                                        </>
                                    )}
                                />
                            </div>
                            <div>
                                <Label htmlFor="eventMedia" className="text-gray-900">Event Image/Video</Label>
                                <Controller
                                    control={control}
                                    name="eventMedia"
                                    render={({ field }) => (
                                        <>
                                            <Input id="eventMedia" type="file" placeholder="Enter event media" className="text-gray-900" onChange={field.onChange} value={field.value} />
                                            {errors.eventMedia && <p className="text-red-500">{errors.eventMedia.message}</p>}
                                        </>
                                    )}
                                />
                            </div>
                            <div>
                                <Label htmlFor="organizationType" className="text-gray-900">Cause Type</Label>
                                <Controller
                                    control={control}
                                    name="causeType"
                                    render={({ field }) => (
                                        <>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="text-gray-900">
                                                    <SelectValue placeholder="Select cause type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="option_1">Option 1</SelectItem>
                                                    <SelectItem value="option_2">Option 2</SelectItem>
                                                    <SelectItem value="option_3">Option 3</SelectItem>
                                                    <SelectItem value="option_4">Option 4</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.causeType && <p className="text-red-500">{errors.causeType.message}</p>}
                                        </>
                                    )}
                                />
                            </div>
                            <div>
                                <Label htmlFor="otherCause" className="text-gray-900">Other Cause Type</Label>
                                <Controller
                                    control={control}
                                    name="otherCause"
                                    render={({ field }) => (
                                        <>
                                            <Input id="otherCause" type="text" placeholder="Enter Other Cause" className="text-gray-900" onChange={field.onChange} defaultValue={field.value}
                                            />
                                            {errors.otherCause && <p className="text-red-500">{errors.otherCause.message}</p>}
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">Where Will The Fund Go?</h2>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="street" className="text-gray-900">Street</Label>
                                <Controller
                                    control={control}
                                    name="street"
                                    render={({ field }) => (
                                        <>
                                            <Input id="street" placeholder="Enter street" className="text-gray-900" onChange={field.onChange} value={field.value} />
                                            {errors.street && <p className="text-red-500">{errors.street.message}</p>}
                                        </>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="city" className="text-gray-900">City</Label>
                                    <Controller
                                        control={control}
                                        name="city"
                                        render={({ field }) => (
                                            <>
                                                <Input id="city" placeholder="Enter city" className="text-gray-900" onChange={field.onChange} value={field.value} />
                                                {errors.city && <p className="text-red-500">{errors.city.message}</p>}
                                            </>
                                        )}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="state" className="text-gray-900">State</Label>
                                    <Controller
                                        control={control}
                                        name="state"
                                        render={({ field }) => (
                                            <>
                                                <Input id="state" placeholder="Enter state" className="text-gray-900" onChange={field.onChange} value={field.value} />
                                                {errors.state && <p className="text-red-500">{errors.state.message}</p>}
                                            </>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="zipCode" className="text-gray-900">Zip Code</Label>
                                    <Controller
                                        control={control}
                                        name="zipCode"
                                        render={({ field }) => (
                                            <>
                                                <Input id="zipCode" placeholder="Enter zip code" className="text-gray-900" onChange={field.onChange} value={field.value} />
                                                {errors.zipCode && <p className="text-red-500">{errors.zipCode.message}</p>}
                                            </>
                                        )}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="country" className="text-gray-900">Country</Label>
                                    <Controller
                                        control={control}
                                        name="country"
                                        render={({ field }) => (
                                            <>
                                                <Input id="country" placeholder="Enter country" className="text-gray-900" onChange={field.onChange} value={field.value} />
                                                {errors.country && <p className="text-red-500">{errors.country.message}</p>}
                                            </>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">Fundraising Goal</h2>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="goalAmount" className="text-gray-900">Goal Amount</Label>
                                <Controller
                                    control={control}
                                    name="goalAmount"
                                    render={({ field }) => (
                                        <>
                                            <Input id="goalAmount" placeholder="Enter goal amount" className="text-gray-900" onChange={field.onChange} value={field.value} />
                                            {errors.goalAmount && <p className="text-red-500">{errors.goalAmount.message}</p>}
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">Social Media Links</h2>
                        <div className="space-y-4">
                            {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                                <div key={social}>
                                    <Label htmlFor={social.toLowerCase()} className="text-gray-900">{social}</Label>
                                    <Controller
                                        control={control}
                                        // name={`${social.toLowerCase()}` as social}
                                        name={social.toLowerCase() as social}
                                        render={({ field }) => (
                                            <>
                                                <Input id={social.toLowerCase()} placeholder="Enter link" className="text-gray-900" onChange={field.onChange} value={field.value as string} />
                                                {errors[`${social.toLocaleLowerCase()}` as social] && <p className="text-red-500">{errors[`${social.toLocaleLowerCase()}` as social]?.message as social}</p>}
                                            </>
                                        )}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">Additional Options</h2>
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="bg-gray-100 p-1 rounded-lg">
                                <TabsTrigger
                                    value="donation"
                                    className={cn(
                                        "rounded-md transition-colors",
                                        "data-[state=active]:bg-white data-[state=active]:text-gray-900",
                                        "data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-500"
                                    )}
                                >
                                    Donation
                                </TabsTrigger>
                                <TabsTrigger
                                    value="vip"
                                    className={cn(
                                        "rounded-md transition-colors",
                                        "data-[state=active]:bg-white data-[state=active]:text-gray-900",
                                        "data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-500"
                                    )}
                                >
                                    VIP
                                </TabsTrigger>
                                <TabsTrigger
                                    value="sponsorship"
                                    className={cn(
                                        "rounded-md transition-colors",
                                        "data-[state=active]:bg-white data-[state=active]:text-gray-900",
                                        "data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-500"
                                    )}
                                >
                                    Sponsorship
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="donation">
                                <div className="space-y-4">
                                    <Label htmlFor="donationAmount" className="text-gray-900">Donation Amount</Label>
                                    <Input id="donationAmount" type="number" placeholder="Enter donation amount" className="text-gray-900" />
                                </div>
                            </TabsContent>
                            <TabsContent value="vip">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900">VIP Tiers</h3>
                                    {[1, 2, 3].map((tier) => (
                                        <div key={tier} className="space-y-2">
                                            <Label htmlFor={`tierName${tier}`} className="text-gray-900">Tier {tier} Name</Label>
                                            <Input id={`tierName${tier}`} placeholder={`Enter Tier ${tier} name`} className="text-gray-900" />
                                            <Label htmlFor={`tierDescription${tier}`} className="text-gray-900">Tier {tier} Description</Label>
                                            <Input id={`tierDescription${tier}`} placeholder={`Enter Tier ${tier} description`} className="text-gray-900" />
                                            <Label htmlFor={`tierPerks${tier}`} className="text-gray-900">Tier {tier} Perks</Label>
                                            <Input id={`tierPerks${tier}`} placeholder={`Enter Tier ${tier} perks`} className="text-gray-900" />
                                            <Label htmlFor={`tierAmount${tier}`} className="text-gray-900">Tier {tier} Amount</Label>
                                            <Input id={`tierAmount${tier}`} type="number" placeholder={`Enter Tier ${tier} amount`} className="text-gray-900" />
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="sponsorship">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="sponsorshipName" className="text-gray-900">Sponsorship Name</Label>
                                        <Input id="sponsorshipName" placeholder="Enter sponsorship name" className="text-gray-900" />
                                    </div>
                                    <div>
                                        <Label htmlFor="sponsorshipAmount" className="text-gray-900">Sponsorship Amount</Label>
                                        <Input id="sponsorshipAmount" type="number" placeholder="Enter sponsorship amount" className="text-gray-900" />
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </section>

                    <Sponsors />

                    <Merchandise />

                    <Button type="submit" className="w-full">Submit</Button>
                </form>
            </FormProvider>
        </div>
    )
}