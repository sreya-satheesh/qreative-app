
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <header className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Qreative</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button asChild>
            <Link href="/generate">Create QR Code</Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 md:px-8 py-16">
        <Card className="max-w-4xl mx-auto shadow-lg rounded-xl bg-card">
          <CardHeader>
            <CardTitle className="text-3xl">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground prose dark:prose-invert">
            <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <p>Please read these terms and conditions carefully before using Our Service.</p>
            
            <h2 className="text-2xl font-bold text-foreground pt-4">Acknowledgment</h2>
            <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
            <p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</p>
            <p>By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.</p>

            <h2 className="text-2xl font-bold text-foreground pt-4">Links to Other Websites</h2>
            <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.</p>
            <p>The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>

            <h2 className="text-2xl font-bold text-foreground pt-4">Termination</h2>
            <p>We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p>
            <p>Upon termination, Your right to use the Service will cease immediately.</p>
            
            <h2 className="text-2xl font-bold text-foreground pt-4">Changes to These Terms and Conditions</h2>
            <p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.</p>
            
            <h2 className="text-2xl font-bold text-foreground pt-4">Contact Us</h2>
            <p>If you have any questions about these Terms and Conditions, You can contact us:</p>
            <ul className="list-disc list-inside space-y-2">
                <li>By email: contact@qreative.com</li>
            </ul>

          </CardContent>
        </Card>
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
