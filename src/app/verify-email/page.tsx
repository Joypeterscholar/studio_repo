'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useRef, useState } from 'react';

export default function VerifyEmailPage() {
  const [code, setCode] = useState(new Array(4).fill(''));
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold text-primary" style={{fontFamily: 'Alegreya, serif'}}>Verify email address</h1>
        <p className="mt-2 text-muted-foreground">
          We sent a 4-digit code to your mail.
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
                className="h-20 w-16 sm:h-24 sm:w-20 text-center text-3xl font-bold border-primary/50 focus:border-primary focus:ring-primary"
              />
            );
          })}
        </div>

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
