/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import validationMsg from "@/mock/validationMsg"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"

const schema = yup.object().shape({
    name: yup.string().required(validationMsg.error.name),
    email: yup.string().email().required(validationMsg.error.email),
    beneficiaryName: yup.string().required(validationMsg.error.beneficiaryName),
    beneficiaryEmail: yup.string().email().required(validationMsg.error.beneficiaryEmail),
    // causeType: yup.string().required(validationMsg.error.causeType),
    // otherCause: yup.string().when('causeType', {
    //     is: (value: string) => value === undefined,
    //     then: () => yup.string().required('Please specify the other cause'),
    //     otherwise: () => yup.string()
    // }), // when is used to check if the value is present or not and based on other field we can specify the validation
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
}, [['causeType', 'otherCause']])

export default function SomeoneElseFundraisingForm() {

    const { control, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = (data: any) => {
        console.log(data)
    }

    console.log(watch());

    return (
        <div className="py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Start Fundraising for Someone Else!</h1>

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
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">Beneficiary Details</h2>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="beneficiaryName" className="text-gray-900">Beneficiary Name</Label>
                            <Controller
                                control={control}
                                name="beneficiaryName"
                                render={({ field }) => (
                                    <>
                                        <Input id="beneficiaryName" placeholder="Enter beneficiary name" className="text-gray-900" onChange={field.onChange} defaultValue={field.value} />
                                        {errors.beneficiaryName && <p className="text-red-500">{errors.beneficiaryName.message}</p>}
                                    </>
                                )}
                            />
                        </div>
                        <div>
                            <Label htmlFor="beneficiaryEmail" className="text-gray-900">Beneficiary Email</Label>
                            <Controller
                                control={control}
                                name="beneficiaryEmail"
                                render={({ field }) => (
                                    <>
                                        <Input id="beneficiaryEmail" type="email" placeholder="Enter beneficiary email" className="text-gray-900" onChange={field.onChange} defaultValue={field.value} />
                                        {errors.beneficiaryEmail && <p className="text-red-500">{errors.beneficiaryEmail.message}</p>}
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
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">Where Will The Fund Go?</h2>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="street" className="text-gray-900">Street</Label>
                            <Input id="street" placeholder="Enter street address" className="text-gray-900" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="city" className="text-gray-900">City</Label>
                                <Input id="city" placeholder="Enter city" className="text-gray-900" />
                            </div>
                            <div>
                                <Label htmlFor="state" className="text-gray-900">State</Label>
                                <Input id="state" placeholder="Enter state" className="text-gray-900" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="zipCode" className="text-gray-900">Zip Code</Label>
                                <Input id="zipCode" placeholder="Enter zip code" className="text-gray-900" />
                            </div>
                            <div>
                                <Label htmlFor="country" className="text-gray-900">Country</Label>
                                <Input id="country" placeholder="Enter country" className="text-gray-900" />
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">Fundraising Goal</h2>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="goalAmount" className="text-gray-900">Goal Amount</Label>
                            <Input id="goalAmount" type="number" placeholder="Enter goal amount" className="text-gray-900" />
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">Social Media Links</h2>
                    <div className="space-y-4">
                        {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                            <div key={social}>
                                <Label htmlFor={social.toLowerCase()} className="text-gray-900">{social}</Label>
                                <Input id={social.toLowerCase()} placeholder={`Enter ${social} URL`} className="text-gray-900" />
                            </div>
                        ))}
                    </div>
                </section>

                <Button type="submit" className="w-full" name="btnSubmit">Submit</Button>
            </form>
        </div>
    )
}