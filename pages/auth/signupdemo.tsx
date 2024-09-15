"use client"

import { Controller, useForm } from "react-hook-form"
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { yupResolver } from "@hookform/resolvers/yup"

const FormSchema = yup.object().shape({
    username: yup.string().trim().required("Please enter your username"),
    name: yup.string().trim().required("Please enter your name"),
    email: yup.string().trim().email().required("Please enter a valid email"),
    phone: yup.string().trim().min(8).max(12).required("Please enter your phone number"),
    address: yup.object({
        street: yup.string().trim().required("Please enter your address"),
        city: yup.string().trim().required("Please enter your city"),
        state: yup.string().trim().required("Please enter your state"),
        zip: yup.string().trim().required("Please enter your zip"),
        country: yup.string().trim().required("Please enter your country"),
    }),
    social: yup.array().of(
        yup.string().trim().required("Please enter your social media links")
    ),
    cloth: yup.array().of(
        yup.object({
            name: yup.string().trim().required("Please enter your cloth name"),
            color: yup.string().trim().required("Please enter your cloth color"),
        })
    ),
    category: yup.string().trim().required("Please enter your category"),
});

export default function Signup() {
    const form = useForm<yup.InferType<typeof FormSchema>>({
        resolver: yupResolver(FormSchema),
        mode: "onChange",
    })

    function onSubmit(data: yup.InferType<typeof FormSchema>) {
        console.log(data);
    }

    // console.log(form.watch());
    // console.log(JSON.stringify(FormSchema, null, 2));
    // console.log(FormData);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <Controller
                        control={form.control}
                        // {...form.register("username")}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your unique username.
                                </FormDescription>
                                <FormMessage >
                                    {form?.formState?.errors?.username?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <Controller
                        control={form.control}
                        // {...form.register("name")}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage >
                                    {form?.formState?.errors?.name?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <Controller
                        control={form.control}
                        // {...form.register("email")}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public email.
                                </FormDescription>
                                <FormMessage >
                                    {form?.formState?.errors?.email?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <Controller
                        control={form.control}
                        // {...form.register("email")}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} type="number" />
                                </FormControl>
                                <FormDescription>
                                    This is your public phone.
                                </FormDescription>
                                <FormMessage >
                                    {form?.formState?.errors?.phone?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <Controller
                        control={form.control}
                        // {...form.register("address.street")}
                        name="address.street"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Street</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public Street.
                                </FormDescription>
                                <FormMessage >
                                    {form?.formState?.errors?.address?.street?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <Controller
                        control={form.control}
                        // {...form.register("address.city")}
                        name="address.city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public city.
                                </FormDescription>
                                <FormMessage >
                                    {form?.formState?.errors?.address?.city?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <Controller
                        control={form.control}
                        // {...form.register("address.state")}
                        name="address.state"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public state.
                                </FormDescription>
                                <FormMessage >
                                    {form?.formState?.errors?.address?.state?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <Controller
                        control={form.control}
                        // {...form.register("address.zip")}
                        name="address.zip"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Zip Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public zip code.
                                </FormDescription>
                                <FormMessage >
                                    {form?.formState?.errors?.address?.zip?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <Controller
                        control={form.control}
                        // {...form.register("address.country")}
                        name="address.country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public country.
                                </FormDescription>
                                <FormMessage >
                                    {form?.formState?.errors?.address?.country?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <Controller
                        control={form.control}
                        // {...form.register("address.country")}
                        name="social.0"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Facebook</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public facebook link.
                                </FormDescription>
                                <FormMessage >
                                    {form?.formState?.errors?.social?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <Controller
                        control={form.control}
                        // {...form.register("address.country")}
                        name="social.1"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Twitter</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public twitter link.
                                </FormDescription>
                                <FormMessage >
                                    {form?.formState?.errors?.social?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <Controller
                        control={form.control}
                        // {...form.register("address.country")}
                        name="cloth.0.name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cloth Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public twitter cloth name.
                                </FormDescription>
                                <FormMessage >
                                    {form?.formState?.errors?.cloth?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <Controller
                        control={form.control}
                        // {...form.register("address.country")}
                        name="cloth.0.color"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cloth Color</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public twitter cloth name.
                                </FormDescription>
                                <FormMessage >
                                    {form?.formState?.errors?.cloth?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <Controller
                        control={form.control}
                        // {...form.register("address.country")}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select a fruit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Fruits</SelectLabel>
                                                <SelectItem value="apple">Apple</SelectItem>
                                                <SelectItem value="banana">Banana</SelectItem>
                                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                                <SelectItem value="grapes">Grapes</SelectItem>
                                                <SelectItem value="pineapple">Pineapple</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>
                                    This is your public twitter cloth name.
                                </FormDescription>
                                <FormMessage >
                                    {form?.formState?.errors?.category?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}
