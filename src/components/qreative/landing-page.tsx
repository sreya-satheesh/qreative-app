
'use client';

import {
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons/logo';
import { Separator } from '@/components/ui/separator';

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <header className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Qreative</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        </nav>
      </header>

      <main className="flex-grow flex items-center">
        <section className="container mx-auto px-4 md:px-8 py-16 md:py-24">
             <div className="grid gap-12 items-center">
                <div className="space-y-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                        Create & Share Custom <br/>QR Codes Instantly
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Generate beautiful and functional QR codes for your links, text, and more.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild>
                            <Link href="/generate">Create QR Code <ArrowRight className="ml-2" /></Link>
                        </Button>
                    </div>
                </div>
             </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 md:px-8 py-8">
        <Separator />
        <div className="mt-8 flex justify-center items-center text-sm text-muted-foreground">
            <p>Created with ❤️, from Sreya Satheesh.</p>
        </div>
      </footer>
      
    </div>
  );
}
