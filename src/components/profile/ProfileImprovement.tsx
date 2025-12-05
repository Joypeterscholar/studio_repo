"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles, Loader2 } from "lucide-react";
import {
  aiProfileImprovement,
  type AIProfileImprovementOutput,
} from "@/ai/flows/ai-profile-improvement";

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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type User } from "@/lib/data";

const formSchema = z.object({
  bio: z.string().min(10, "Bio should be at least 10 characters.").max(500),
  interests: z.string().min(3, "Please list at least one interest."),
});

type ProfileImprovementFormValues = z.infer<typeof formSchema>;

interface ProfileImprovementProps {
  currentUser: User;
}

export default function ProfileImprovement({
  currentUser,
}: ProfileImprovementProps) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<AIProfileImprovementOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<ProfileImprovementFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bio: currentUser.bio || "",
      interests: Array.isArray(currentUser.interests)
        ? currentUser.interests.join(", ")
        : currentUser.interests || "",
    },
  });

  const onSubmit = (values: ProfileImprovementFormValues) => {
    startTransition(async () => {
      setError(null);
      setResult(null);
      try {
        const aiResult = await aiProfileImprovement(values);
        setResult(aiResult);
        setIsDialogOpen(true);
      } catch (e) {
        setError("Failed to get suggestions. Please try again.");
        console.error(e);
      }
    });
  };

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Sparkles className="text-accent size-8" />
          <div>
            <CardTitle className="font-headline text-2xl">
              AI Profile Boost
            </CardTitle>
            <p className="text-muted-foreground mt-1">
              Let our AI help you stand out from the crowd.
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-headline">Your Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about yourself..."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-headline">Your Interests</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Hiking, Coding, Tacos"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Separate interests with a comma.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting Suggestions...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get Suggestions
                  </>
                )}
              </Button>
            </form>
          </Form>

          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl flex items-center gap-2">
                <Sparkles className="text-primary" /> AI Suggestions
              </DialogTitle>
              <DialogDescription>
                Here are some ideas to make your profile even better.
              </DialogDescription>
            </DialogHeader>
            {result && (
              <div className="grid gap-6 py-4 font-body">
                <div>
                  <h3 className="font-headline text-lg font-semibold mb-2">
                    Suggested Bio
                  </h3>
                  <p className="text-sm text-foreground/80 p-4 bg-muted rounded-md border">
                    {result.improvedBio}
                  </p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold mb-2">
                    Suggested Interests
                  </h3>
                  <p className="text-sm text-foreground/80 p-4 bg-muted rounded-md border">
                    {result.improvedInterests}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
