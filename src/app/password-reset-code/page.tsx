'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function PasswordResetCodePage() {
  const [code, setCode] = useState(['', '', '', '']);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);

    // Focus next input
    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && inputsRef.current[index - 1]) {
        inputsRef.current[index - 1]!.focus();
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background p-4 sm:p-6 md:p-8">
        <div className="flex items-center">
            <Link href="/reset-password">
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
                  <ChevronLeft className="h-6 w-6" />
              </Button>
            </Link>
        </div>
      <div className="w-full max-w-sm text-center mx-auto mt-8">
        <h1 className="text-2xl font-bold text-primary" style={{fontFamily: 'Alegreya, serif'}}>
            Password reset code
        </h1>
        
        <p className="mt-4 text-muted-foreground">
            We sent a 4-digit reset code to<br /> your a*********ye@gmail.com
        </p>

        <div className="mt-8 flex justify-center gap-2 sm:gap-4">
          {code.map((data, index) => {
            return (
              <Input
                key={index}
                type="text"
                maxLength={1}
                value={data}
                onChange={(e) => handleInputChange(e.target as HTMLInputElement, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
                ref={(el) => (inputsRef.current[index] = el)}
                className={cn(
                    "h-20 w-16 sm:h-20 sm:w-16 text-center text-3xl font-bold border-primary/50 focus:border-primary focus:ring-primary rounded-2xl",
                )}
              />
            );
          })}
        </div>

        <p className="mt-8 text-muted-foreground">
            Wrong email address?{' '}
            <Button variant="link" className="p-0 font-bold text-primary">
                Change email
            </Button>
        </p>

      </div>
    </div>
  );
}
