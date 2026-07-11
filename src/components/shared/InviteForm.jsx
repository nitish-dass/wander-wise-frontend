import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import * as z from "zod"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { Field, FieldError, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'

const formSchema =z.object({
    collaboratorEmails: z.array(z.string().email("Invalid email address").min(5, "Must not be empty").min(1, "Atleast one email is required")),
})

const InviteForm = () => {

    const [dependency, setDependency] = React.useState(0);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            collaboratorEmails: [""],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "collaboratorEmails",
      });

    const onSubmit = async (data) => {
        console.log(data);
    };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
            <CardHeader>
                <CardTitle>
                    Invite collaborators
                </CardTitle>
                <CardDescription>Enter emails of people you want to invite.</CardDescription>
                <CardAction>
                    <Button onClick={() => append("")} type='button' varient='outline' size='icon'>
                        <Plus />
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>

                        {fields.map((item, index) => {
                          return (
                            <Controller
                              key={index}
                              name={`collaboratorEmails[${index}]`}
                              control={form.control}
                              render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                  <FieldLabel htmlFor={field.name}>
                                    Collaborators {index + 1}
                                  </FieldLabel>
                                  <Input
                                    {...field}
                                    id={field.name}
                                    type="email"
                                    placeholder="abc@gmail.com"
                                    aria-invalid={fieldState.invalid}
                                  />
                                  {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                  )}
                                </Field>
                              )}
                            />
                          );
                        })}
            
            </CardContent>
            <CardFooter>
                <Button type="submit" className="w-full">Send Invite </Button>
            </CardFooter>
        </Card>
    </form>
  )
}

export default InviteForm

