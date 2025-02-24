import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Button} from "@/components/ui/button"
import {Checkbox} from "@/components/ui/checkbox"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form"
import {Calendar} from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {AlertCircle} from "lucide-react"
import {CalendarIcon} from "lucide-react"
import {useForm} from "react-hook-form"
import {format} from "date-fns"
import {cn} from "@/lib/utils"
import {useContext} from "react";
import DataContext from "@/Providers/DataContext.jsx";


const AddTaskComponent = () => {

    const {saveNewTaskToDatabase} = useContext(DataContext);

    const form = useForm({
        defaultValues: {
            title: "",
            description: "",
            date: new Date(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            category: "To-Do"
        }
    })


    const onSubmit = async (event) => {
        const task = {
            title: event?.title,
            description: event?.description,
            deadline: `${format(event.date, "yyyy-MM-dd")} ${event.time}`,
            category: event?.category,
            createdOn: new Date().toISOString()
        }
        await saveNewTaskToDatabase(task);
        // console.log(task);
        // form.reset();
    }


    return (
        <Card className="w-1/2 mx-auto my-6">
            <CardHeader>
                <CardTitle className={'text-2xl'}>Create New Task</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            rules={{required: "Task title is required"}}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Task Title" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-sm flex items-center gap-1">
                                        {form.formState.errors.title &&
                                            <AlertCircle className="h-4 w-4 text-yellow-500"/>}
                                        {form.formState.errors.title?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            rules={{required: "Task description is required"}}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea placeholder="Task Description" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-sm flex items-center gap-1">
                                        {form.formState.errors.description &&
                                            <AlertCircle className="h-4 w-4 text-yellow-500"/>}
                                        {form.formState.errors.description?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name="date"
                                rules={{required: "Date is required"}}
                                render={({field}) => (
                                    <FormItem className="flex-1">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date(new Date().setHours(0, 0, 0, 0))
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage className="text-red-500 text-sm flex items-center gap-1">
                                            {form.formState.errors.date &&
                                                <AlertCircle className="h-4 w-4 text-yellow-500"/>}
                                            {form.formState.errors.date?.message}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="time"
                                rules={{required: "Time is required"}}
                                render={({field}) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input
                                                type="time"
                                                placeholder="Select time"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm flex items-center gap-1">
                                            {form.formState.errors.time &&
                                                <AlertCircle className="h-4 w-4 text-yellow-500"/>}
                                            {form.formState.errors.time?.message}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="category"
                            rules={{required: "Please select a category"}}
                            render={({field}) => (
                                <FormItem>
                                    <div className="flex space-x-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="todo"
                                                checked={field.value === "To-Do"}
                                                onCheckedChange={() => field.onChange("To-Do")}
                                                defaultChecked
                                            />
                                            <label htmlFor="todo">To-Do</label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="progress"
                                                checked={field.value === "In Progress"}
                                                onCheckedChange={() => field.onChange("In Progress")}
                                            />
                                            <label htmlFor="progress">In Progress</label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="done"
                                                checked={field.value === "Done"}
                                                onCheckedChange={() => field.onChange("Done")}
                                            />
                                            <label htmlFor="done">Done</label>
                                        </div>
                                    </div>
                                    <FormMessage className="text-red-500 text-sm flex items-center gap-1">
                                        {form.formState.errors.category &&
                                            <AlertCircle className="h-4 w-4 text-yellow-500"/>}
                                        {form.formState.errors.category?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Add Task</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default AddTaskComponent;
