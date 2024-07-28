"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import GeneratePodcast from "@/components/GeneratePodcast";
import GenerateThumbnail from "@/components/GenerateThumbnail";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { voiceDetails } from "@/constants";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  podcastTitle: z.string().min(2, {
    message: "PodcastTitle must be at least 2 characters.",
  }),
  podscastDescription: z.string().min(2, {
    message: "PodcastDiscription must be at least 2 characters.",
  }),
});

const createPodcast = () => {
  const [voiceType, setVoiceType] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [voicePrompt, setVoicePrompt] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podscastDescription: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-20 font-bold text-center text-white-1">Create Podcast</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col">
          <div className="flex-col flex gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex-col flex gap-2">
                  <FormLabel className="text-16 font-bold text-white-1">PodcastTitle</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Sam Poscast"
                      {...field}
                      className="input-class focus-visible:ring-offset-orange-1"
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />

            <div className="flex-col flex gap-2.5">
              <Label className="text-16 font-bold text-white-1">Select Ai voice</Label>
              <Select onValueChange={(value) => setVoiceType(value)}>
                <SelectTrigger className={cn("text-16 w-full border-none bg-black-1 text-gray-1")}>
                  <SelectValue placeholder="Select Ai voice" className="placeholder-white-1" />
                </SelectTrigger>
                <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1">
                  {voiceDetails.map((voice) => (
                    <SelectItem value={voice.name} key={voice.id}>
                      {voice.name}
                    </SelectItem>
                  ))}
                </SelectContent>
                {voiceType && <audio src={`/${voiceType}.mp3`} autoPlay className="hidden" />}
              </Select>
            </div>

            <FormField
              control={form.control}
              name="podscastDescription"
              render={({ field }) => (
                <FormItem className="flex-col flex gap-2">
                  <FormLabel className="text-16 font-bold text-white-1">PodcastDiscription</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a short description of your podcast"
                      {...field}
                      className="input-class focus-visible:ring-offset-orange-1"
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex-col flex pt-10">
            <GeneratePodcast
              setAudioStorageId={setAudioStorageId}
              setAudio={setAudioUrl}
              voiceType={voiceType!}
              audio={audioUrl}
              voicePrompt={voicePrompt}
              setVoicePrompt={setVoicePrompt}
              setAudioDuration={setAudioDuration}
            />
            <GenerateThumbnail
              setImage={setImageUrl}
              setImageStorageId={setImageStorageId}
              image={imageUrl}
              imagePrompt={imagePrompt}
              setImagePrompt={setImagePrompt}
            />

            <div className="mt-10 w-full">
              <Button
                type="submit"
                className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-200 hover:bg-black-1"
              >
                {isSubmitted ? (
                  <>
                    Submitting
                    <LoaderCircleIcon size={20} className="animate-spin mr-2" />
                  </>
                ) : (
                  <>Submit & Public Podcast</>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default createPodcast;
