"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"; 
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ActivitySquareIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; 
import { createAssistant, createAssistantWithFile } from "@/lib/api";
import FileDrop from "./_components/FileDrop";
import { useHeaderContext } from "@/context/HeaderContext";
import { useEffect } from "react";

const requestSchema = z.object({
  astName: z.string().nonempty({ message: "Name is required" }),
  astInstruction: z.string().nonempty({ message: "Instruction is required" }),
  gptModel: z.string().nonempty({ message: "GPT Model is required" }),
  files: z.array(z.any()).optional(),
  astTools: z.string().nonempty({ message: "At least one tool is required" }),
});

interface RequestFormProps {
  onRequestSuccess: (data: FieldValues) => void;
}

export default function RequestForm({ onRequestSuccess }: RequestFormProps) {
  const { setSelectedItem, setSelectedMenu } = useHeaderContext();
  useEffect(() => {
    setSelectedItem("ChatBots"); 
    setSelectedMenu("create_bot");
  }, [setSelectedItem, setSelectedMenu]);
  
  const requestForm = useForm<FieldValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      astName: "",
      astInstruction: "",
      gptModel: "gpt-4o-mini", 
      files: [],
      astTools: "code_interpreter",
    },
  });

  const handleFilesAdded = (acceptedFiles: File[]) => {
    requestForm.setValue("files", acceptedFiles);
  };

  const handleRequest: SubmitHandler<FieldValues> = async (data) => {
    console.log("Submitted Data:", data);
    
    try {
      if (data.files && data.files.length > 0) {
        console.log("Creating assistant with files:", data.files);
        const result = await createAssistantWithFile(data.astName, data.astInstruction, data.gptModel, [data.astTools], data.files);
        console.log("Assistant created with files:", result);
      } else {
        console.log("Creating assistant without files");
        const result = await createAssistant(data.astName, data.astInstruction, data.gptModel, [data.astTools]);
        console.log("Assistant created without files:", result);
      }
      
      toast.success("Success!", {
        description: "Your request has been processed successfully.",
      });
    } catch (error: any) {
      console.error("Error during API request:", error);
      toast.error(error.message || 'Failed to process request');
    }
  };

  return (
    <Card className="m-4">
      <CardHeader className="p-4 bg-gray-100">
        <div className="flex flex-row items-center gap-2">
          <ActivitySquareIcon strokeWidth={1.4} className="text-green-600" />
          <p className="text-base mt-0 font-medium">Active Bot Setup</p>
        </div>
      </CardHeader>
      <CardContent className="py-6 px-12">
        <Form {...requestForm}>
          <form onSubmit={requestForm.handleSubmit(handleRequest)} className="grid gap-4">
            {/* Name Field */}
            <FormField
              control={requestForm.control}
              name="astName"
              render={({ field }) => (
                <FormItem className="flex flex-row justify-between items-center">
                  <div className="flex-1 p-2">
                    <FormLabel>Name</FormLabel>
                    <FormDescription>Enter the name of the assistant you are going to create or call.</FormDescription>
                  </div>
                  <div className="flex-1 p-2 pr-20">
                    <FormControl>
                      <Input {...field} placeholder="Your Assistant's Name" />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <hr className="px-4" />

            {/* Instructions Field */}
            <FormField
              control={requestForm.control}
              name="astInstruction"
              render={({ field }) => (
                <FormItem className="flex flex-row justify-between items-center">
                  <div className="flex-1 p-2">
                    <FormLabel>Instructions</FormLabel>
                    <FormDescription>Provide specific instructions for the assistant.</FormDescription>
                  </div>
                  <div className="flex-1 p-2 pr-20">
                    <FormControl>
                      <Input {...field} placeholder="Provide your instructions here" />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <hr className="px-4" />

            {/* GPT Model Field (Shadcn UI Select) */}
            <FormField
              control={requestForm.control}
              name="gptModel"
              render={({ field }) => (
                <FormItem className="flex flex-row justify-between items-center">
                  <div className="flex-1 p-2">
                    <FormLabel>GPT Model</FormLabel>
                    <FormDescription>Select the GPT model you would like to use.</FormDescription>
                  </div>
                  <div className="flex-1 p-2 pr-20">
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a GPT model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                          <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <hr className="px-4" />

            {/* Files Field */}
            <FormItem className="flex flex-row justify-between items-center">
              <div className="flex-1 p-2">
                <FormLabel>Files</FormLabel>
                <FormDescription>Upload any files required for this assistant.</FormDescription>
              </div>
              <div className="flex-1 p-2 pr-20">
                <FormControl>
                  <FileDrop onFilesAdded={handleFilesAdded} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
            <hr className="px-4" />

            {/* Tools Field (Radio Group) */}
            <FormField
              control={requestForm.control}
              name="astTools"
              render={({ field }) => (
                <FormItem className="flex flex-row justify-between items-center">
                  <div className="flex-1 p-2">
                    <FormLabel>Tools</FormLabel>
                    <FormDescription>Select one of the tools available for the assistant.</FormDescription>
                  </div>
                  <div className="flex-1 p-2 pr-20">
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="code_interpreter" />
                          <label>Code Interpreter</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="file_search" />
                          <label>File Search</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <hr className="px-4" />

            {/* Submit Button */}
            <Button type="submit" className="mt-4 rounded-xl">
              Start Bot Setup
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}