/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { Controller, FieldErrors, useFieldArray, useFormContext } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type TMerchandise = {
    merchandiseField: {
        name: string;
        company: string;
    }[]
}

function Merchandise() {

    const { control, formState: { errors } } = useFormContext();

    const { fields, append } = useFieldArray({
        control,
        name: "merchandiseField",
    })

    const errorMessages = errors.merchandiseField as FieldErrors<TMerchandise['merchandiseField'][]>[number];

    return (
        <>
            {
                fields.map((field, index) => (
                    <section key={field.id}>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">Merchandise Details</h2>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="yourName" className="text-gray-900">Merchandise Name</Label>
                                <Controller
                                    control={control}
                                    name={`merchandiseField.${index}.name` as const}
                                    render={({ field }) => (
                                        <>
                                            <Input id="name" placeholder="Enter your merchandise name" className="text-gray-900" onChange={field.onChange} defaultValue={field.value} />
                                            {/* {errorMessages!?.[index]?.name && <p className="text-red-500">{String(`errorMessages.${index}.name.message`)}</p>} */}
                                            {errorMessages && errorMessages?.[index]?.name && <p className="text-red-500">{String(errorMessages[index].name.message)}</p>}
                                        </>
                                    )}
                                />
                            </div>
                            <div>
                                <Label htmlFor="yourCompany" className="text-gray-900">Merchandise Company</Label>
                                <Controller
                                    control={control}
                                    name={`merchandiseField.${index}.company` as const}
                                    render={({ field }) => (
                                        <>
                                            <Input id="company" type="text" placeholder="Enter your merchandise company" className="text-gray-900" onChange={field.onChange} defaultValue={field.value} />
                                            {/* {errors.merchandiseField!?.[index]?.company && (<p className="text-red-500">{`errors.merchandiseField.${index}.company.message` as string}</p>)} */}
                                            {errorMessages && errorMessages[index]?.company && (<p className="text-red-500">{errorMessages[index]?.company?.message as string}</p>)}
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                    </section>
                ))
            }
            <button type="button" className='bg-blue-500 text-white rounded px-4 py-2' onClick={() => append({ name: "", company: "" })}>Add</button>
        </>
    )
}

export default Merchandise