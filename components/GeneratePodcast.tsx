import { api } from "@/convex/_generated/api";
import { GeneratePodcastProps } from "@/types";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useAction, useMutation } from "convex/react";
import { LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

const useGeneratePodcast = (props: GeneratePodcastProps) => {
  // Logic for generating podcast
  const [isGenerating, setIsGenerating] = useState(false);
  const getPodcastAudio = useAction(api.openai.generateAudioAction);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getAudioUrl = useMutation(api.podcast.getUrl);
  const { toast } = useToast();

  const generatePodcast = async () => {
    setIsGenerating(true);
    props.setAudio("");

    if (!props.voicePrompt) {
      toast({
        title: "Error",
        description: "Please provide a prompt to generate podcast",
        duration: 3000,
      });
      return setIsGenerating(false);
    }

    try {
      const response = await getPodcastAudio({
        voice: props.voiceType,
        input: props.voicePrompt,
      });

      const blob = new Blob([response], { type: "audio/mpeg" });
      const fileName = `podcast-${uuidv4()}.mp3`;
      const file = new File([blob], fileName, { type: "audio/mpeg" });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;
      props.setAudio(storageId);

      const audioUrl = await getAudioUrl({ storageId });
      props.setAudio(audioUrl!);
      setIsGenerating(false);
      toast({
        title: "Success",
        description: "Podcast generated successfully",
        duration: 3000,
      });
    } catch (error) {
      console.log("Error to generating podcast", error);
      toast({
        title: "Error",
        description: "Error to generating podcast",
        duration: 3000,
        variant: "destructive",
      });
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    generatePodcast,
  };
};

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { isGenerating, generatePodcast } = useGeneratePodcast(props);

  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <Label className="text-16 font-bold text-white-1">Ai prompt to generate podcast</Label>
        <Textarea
          className="input-class focus-visible:ring-offset-orange-1 font-light"
          placeholder="Provide a prompt to generate podcast"
          value={props.voicePrompt}
          onChange={(e) => props.setVoicePrompt(e.target.value)}
          rows={5}
        />
      </div>
      <div className="mt-5 w-full max-w-[200px]">
        <Button type="submit" className="text-16 bg-orange-1 py-4 font-bold text-white-1" onClick={generatePodcast}>
          {isGenerating ? (
            <>
              Generating
              <LoaderCircleIcon size={20} className="animate-spin mr-2" />
            </>
          ) : (
            <>Generate</>
          )}
        </Button>
      </div>
      {props.audio && (
        <audio
          controls
          src={props.audio}
          autoPlay
          className="mt-5"
          onLoadedMetadata={(e) => {
            props.setAudioDuration(e.currentTarget.duration);
          }}
        />
      )}
    </div>
  );
};

export default GeneratePodcast;
