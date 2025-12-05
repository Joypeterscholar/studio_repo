'use client';

import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold text-primary" style={{fontFamily: 'Alegreya, serif'}}>
          Reset password
        </h1>
        <p className="mt-2 text-muted-foreground">
          Choose what to get your password verification code with.
        </p>

        <Tabs defaultValue="telephone" className="mt-8">
          <TabsList className="grid w-full grid-cols-2 rounded-full bg-accent/50">
            <TabsTrigger value="email" className="rounded-full data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md">Email Reset</TabsTrigger>
            <TabsTrigger value="telephone" className="rounded-full data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md">Telephone</TabsTrigger>
          </TabsList>
          <form className="mt-8 space-y-6">
            <TabsContent value="email">
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email address..." 
                    className="h-14 rounded-lg border-0 bg-accent/50 pl-12 focus-visible:ring-primary"
                    />
                </div>
            </TabsContent>
            <TabsContent value="telephone">
                <div className="relative">
                    <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                    id="telephone" 
                    type="tel" 
                    placeholder="+234  _ _ _   _ _ _   _ _ 09" 
                    className="h-14 rounded-lg border-0 bg-accent/50 pl-12 focus-visible:ring-primary"
                    />
                </div>
            </TabsContent>

            <Button type="submit" className="w-full rounded-full" size="lg">
              Send password reset link
            </Button>
          </form>
        </Tabs>

        <p className="mt-8 text-muted-foreground">
            Didn't receive the code?{' '}
            <Button variant="link" className="p-0 font-bold text-primary">
                Resend Code.
            </Button>
        </p>
      </div>
    </div>
  );
}
