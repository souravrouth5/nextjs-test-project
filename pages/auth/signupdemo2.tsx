import React from 'react'
import { Controller, useFieldArray, useForm } from "react-hook-form"
import * as yup from "yup"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    // FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { IFormSchema } from '@/typescript/FormSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Plus } from "lucide-react"

export const FormSchema = yup.object().shape({
    email: yup.string().trim().email().required("Please enter a valid email"),
    name: yup.string().trim().required("Please enter your name"),
    address: yup.object({
        street: yup.string().trim().required("Please enter your address"),
        city: yup.string().trim().required("Please enter your city"),
    }),
    youtube: yup.array().of(
        yup.string().trim().required("Please enter your youtube channel details")
    ).required("Please enter your youtube number"),
    social: yup.array().of(
        yup.object({
            value: yup.string().trim().required("Please enter your social media link"),
        }).required("Please enter at least one social media link")
    ).required("Please enter at least one social media link"),
    // phone: yup.array().of(
    //     yup.string().trim().min(8).max(12)
    // ).required("Please enter at least one phone number").min(1),
})


function Signup() {

    const form = useForm<IFormSchema>({
        resolver: yupResolver(FormSchema),
        mode: "onChange",
        defaultValues: {
            social: [{ value: "" }]
        }
    });
    const { control, handleSubmit, formState: { errors } } = form;

    const { fields: socialFields, append: socialAppend, } = useFieldArray({
        control,
        name: "social",
    })

    const onSubmit = (data: IFormSchema) => {
        console.log(data);
    }

    return (
        <>
            <div className="flex min-h-screen flex-col items-center justify-center gap-4">
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                        <Controller
                            control={control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your unique email.
                                    </FormDescription>
                                    <FormMessage >
                                        {errors?.email?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <Controller
                            control={control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your unique name.
                                    </FormDescription>
                                    <FormMessage >
                                        {errors?.name?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <Controller
                            control={control}
                            name='address.street'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Street</FormLabel>
                                    <FormControl>
                                        <Input placeholder="street" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your street.
                                    </FormDescription>
                                    <FormMessage >
                                        {errors?.address?.street?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <Controller
                            control={control}
                            name='address.city'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="city" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your city.
                                    </FormDescription>
                                    <FormMessage >
                                        {errors?.address?.city?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <Controller
                            control={control}
                            name='youtube.0'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Youtube Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Youtube name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your primary youtube channel name.
                                    </FormDescription>
                                    <FormMessage >
                                        {errors?.youtube?.[0]?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        <Controller
                            control={control}
                            name='youtube.1'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Youtube Link</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Youtube link" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your youtube channel link.
                                    </FormDescription>
                                    <FormMessage >
                                        {errors?.youtube?.[1]?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        {/* <Controller
                            control={control}
                            name='phone.0'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Primary Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Primary phone" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your primary phone number.
                                    </FormDescription>
                                    <FormMessage >
                                        {errors?.phone?.[0]?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <Controller
                            control={control}
                            name='phone.1'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Secondary Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Secondary phone" {...field} type='number' />
                                    </FormControl>
                                    <FormDescription>
                                        This is your secondary phone number.
                                    </FormDescription>
                                    <FormMessage >
                                        {errors?.phone?.[1]?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        /> */}
                        <div className='flex gap-2 w-full items-center'>
                            {
                                socialFields.map((field, index) => (
                                    <Controller key={field.id}
                                        control={control}
                                        name={`social.${index}.value`}
                                        render={({ field }) => (
                                            <FormItem className='flex-grow'>
                                                <FormLabel>Social Media</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Social media" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    This is your social media.
                                                </FormDescription>
                                                <FormMessage >
                                                    {errors?.social?.[index]?.value?.message}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                ))
                            }
                            <Button variant="outline" size="icon" onClick={() => socialAppend({ value: '' })}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        <Button type="submit">Register</Button>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default Signup