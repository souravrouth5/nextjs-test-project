import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function Sponsors() {

    const { control, formState: { errors } } = useFormContext()
    return (
        <>
            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Sponsors Details</h2>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="yourName" className="text-gray-900">Sponsor Name</Label>
                        <Controller
                            control={control}
                            name="sponsorName"
                            render={({ field }) => (
                                <>
                                    <Input id="sponsorName" placeholder="Enter your sponsor name" className="text-gray-900" onChange={field.onChange} defaultValue={field.value} />
                                    {errors.sponsorName && <p className="text-red-500">{String(errors?.sponsorName?.message)}</p>}
                                </>
                            )}
                        />
                    </div>
                    <div>
                        <Label htmlFor="yourCompany" className="text-gray-900">Sponsor Company</Label>
                        <Controller
                            control={control}
                            name="sponsorCompany"
                            render={({ field }) => (
                                <>
                                    <Input id="email" type="text" placeholder="Enter your sponsor company" className="text-gray-900" onChange={field.onChange} defaultValue={field.value} />
                                    {errors.sponsorCompany && (<p className="text-red-500">{String(errors.sponsorCompany.message)}</p>)}
                                </>
                            )}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Sponsors