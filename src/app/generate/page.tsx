
'use client';

import { useCallback, useRef, useState, useMemo, ChangeEvent, useEffect } from 'react';
import {
  Download,
  Link as LinkIcon,
  Type,
  ImageIcon,
  Palette,
  Shield,
  Shapes,
  QrCode,
} from 'lucide-react';
import QRCodeStyling from 'qr-code-styling';
import type { DotType, CornerSquareType, CornerDotType, Gradient } from 'qr-code-styling';


import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Logo } from '@/components/icons/logo';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

type QrType = 'url' | 'text';
type ExportFormat = 'png' | 'svg';
type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
type ColorType = 'single' | 'gradient';

const QRCodeWrapper = ({ options }: { options: any }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (!qrCode) {
                const qrCodeInstance = new QRCodeStyling(options);
                setQrCode(qrCodeInstance);
            }
        }
    }, []);

    useEffect(() => {
        if (qrCode && ref.current) {
            ref.current.innerHTML = '';
            qrCode.append(ref.current);
        }
    }, [qrCode]);

    useEffect(() => {
        if (qrCode) {
            qrCode.update(options);
        }
    }, [options, qrCode]);

    return <div ref={ref} className="w-full h-full" />;
};

export default function GeneratePage() {
    const { toast } = useToast();
    const [qrType, setQrType] = useState<QrType>('url');
    
    // QR Code Data States
    const [url, setUrl] = useState('https://www.google.com/');
    const [text, setText] = useState('Hello, Qreative!');
    const [qrValue, setQrValue] = useState('');
    
    // Style States
    const [colorType, setColorType] = useState<ColorType>('single');
    const [fgColor, setFgColor] = useState('#9400D3');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [gradientType, setGradientType] = useState<Gradient['type']>('linear');
    const [gradientColor1, setGradientColor1] = useState('#9400D3');
    const [gradientColor2, setGradientColor2] = useState('#008080');
    const [gradientRotation, setGradientRotation] = useState(0);

    const [level, setLevel] = useState<ErrorCorrectionLevel>('H');
    const [logo, setLogo] = useState<string | null>(null);
    const [hideBackgroundDots, setHideBackgroundDots] = useState(true);
    const [imageSize, setImageSize] = useState(0.4);
    const [imageMargin, setImageMargin] = useState(4);
    
    // Advanced Styling
    const [dotType, setDotType] = useState<DotType>('classy-rounded');
    const [cornerSquareType, setCornerSquareType] = useState<CornerSquareType>('extra-rounded');
    const [cornerDotType, setCornerDotType] = useState<CornerDotType>('dot');


    // Export States
    const [exportFormat, setExportFormat] = useState<ExportFormat>('png');
    const [exportSize, setExportSize] = useState(512);

    // Security & Validation States
    const [isGenerating, setIsGenerating] = useState(false);
  
    const logoInputRef = useRef<HTMLInputElement>(null);
  
    const valueToGenerate = useMemo(() => {
      switch (qrType) {
        case 'url':
          return url;
        case 'text':
          return text;
        default:
          return '';
      }
    }, [qrType, url, text]);

    const handleGenerate = () => {
        if (isGenerating) return;

        let isValid = true;
        if (qrType === 'url') {
            try {
                new URL(url);
            } catch (_) {
                isValid = false;
                toast({
                    variant: 'destructive',
                    title: 'Invalid URL',
                    description: 'Please enter a valid URL, including http:// or https://',
                });
            }
        } else if (qrType === 'text') {
            if (text.length > 500) {
                isValid = false;
                toast({
                    variant: 'destructive',
                    title: 'Text Too Long',
                    description: 'Please keep your text under 500 characters.',
                });
            }
        }

        if (!valueToGenerate) {
             toast({
                variant: 'destructive',
                title: 'Error',
                description: `Please enter some data to generate a QR code.`,
            });
            return;
        }

        if (isValid) {
            setIsGenerating(true);
            setQrValue(valueToGenerate);
            setTimeout(() => setIsGenerating(false), 2000); // 2 second cooldown
        }
    };

    const gradient: Gradient = useMemo(() => ({
        type: gradientType,
        rotation: gradientRotation,
        colorStops: [
            { offset: 0, color: gradientColor1 },
            { offset: 1, color: gradientColor2 },
        ],
    }), [gradientType, gradientColor1, gradientColor2, gradientRotation]);

    const qrOptions = useMemo(() => ({
        width: 256,
        height: 256,
        data: qrValue,
        image: logo ?? undefined,
        dotsOptions: {
            type: dotType,
            ...(colorType === 'single' ? { color: fgColor } : { gradient }),
        },
        backgroundOptions: {
            color: bgColor,
        },
        imageOptions: {
            hideBackgroundDots: hideBackgroundDots,
            imageSize: imageSize,
            margin: imageMargin,
        },
        cornersSquareOptions: {
            type: cornerSquareType,
            ...(colorType === 'single' ? { color: fgColor } : { gradient }),
        },
        cornersDotOptions: {
            type: cornerDotType,
            ...(colorType === 'single' ? { color: fgColor } : { gradient }),
        },
        qrOptions: {
            errorCorrectionLevel: level
        }
    }), [qrValue, logo, fgColor, dotType, bgColor, cornerSquareType, cornerDotType, level, colorType, gradient, hideBackgroundDots, imageSize, imageMargin]);
  
    const handleDownload = useCallback(async () => {
        if (!qrValue) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: `Please generate a QR code first.`,
            });
            return;
        }

        const qrCode = new QRCodeStyling({
            ...qrOptions,
            width: exportSize,
            height: exportSize,
        });
      
        await qrCode.download({
            name: 'qreative-qrcode',
            extension: exportFormat
        });

        toast({
            title: 'Download Started',
            description: `Your QR code is being downloaded as a .${exportFormat} file.`,
        });
    }, [qrValue, exportFormat, toast, qrOptions, exportSize]);

    const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogo(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
  
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <header className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
                <Logo className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">Qreative</span>
            </Link>
        </header>

        <main className="flex-grow container mx-auto px-4 md:px-8 py-16 flex flex-col md:flex-row gap-8 items-stretch justify-center">
            <div className="w-full md:w-1/2">
                <Card className="p-4 md:p-6 shadow-2xl rounded-2xl bg-card h-full">
                    <CardHeader>
                        <CardTitle>QR Code Generator</CardTitle>
                        <CardDescription>Create beautiful and functional QR codes for anything.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs value={qrType} onValueChange={(v) => setQrType(v as QrType)} className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="url"><LinkIcon className="mr-2" />URL</TabsTrigger>
                                <TabsTrigger value="text"><Type className="mr-2" />Text</TabsTrigger>
                            </TabsList>
                            <TabsContent value="url" className="pt-4">
                                <Input placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} />
                            </TabsContent>
                            <TabsContent value="text" className="pt-4 space-y-4">
                                <Textarea placeholder="Enter your text" value={text} onChange={(e) => setText(e.target.value)} maxLength={500} />
                                <p className="text-xs text-muted-foreground text-right">{text.length} / 500</p>
                            </TabsContent>
                        </Tabs>
                        <Accordion type="multiple" className="w-full mt-6" defaultValue={['colors']}>
                            <AccordionItem value="colors">
                                <AccordionTrigger><Palette className="mr-2" />Colors</AccordionTrigger>
                                <AccordionContent className="pt-4 space-y-4">
                                    <RadioGroup value={colorType} onValueChange={(v) => setColorType(v as ColorType)} className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="single" id="single" />
                                            <Label htmlFor="single">Single Color</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="gradient" id="gradient" />
                                            <Label htmlFor="gradient">Gradient</Label>
                                        </div>
                                    </RadioGroup>

                                    {colorType === 'single' ? (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>Foreground</Label>
                                                <Input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="p-1 h-10"/>
                                            </div>
                                            <div>
                                                <Label>Background</Label>
                                                <Input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="p-1 h-10"/>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                 <div>
                                                    <Label>Start Color</Label>
                                                    <Input type="color" value={gradientColor1} onChange={(e) => setGradientColor1(e.target.value)} className="p-1 h-10"/>
                                                </div>
                                                <div>
                                                    <Label>End Color</Label>
                                                    <Input type="color" value={gradientColor2} onChange={(e) => setGradientColor2(e.target.value)} className="p-1 h-10"/>
                                                </div>
                                            </div>
                                            <div>
                                                <Label>Background</Label>
                                                <Input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="p-1 h-10"/>
                                            </div>
                                            <div>
                                                <Label>Gradient Type</Label>
                                                <Select value={gradientType} onValueChange={(v) => setGradientType(v as Gradient['type'])}>
                                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="linear">Linear</SelectItem>
                                                        <SelectItem value="radial">Radial</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            {gradientType === 'linear' && (
                                                <div>
                                                    <Label>Rotation: {gradientRotation}°</Label>
                                                    <Slider 
                                                        value={[gradientRotation]} 
                                                        onValueChange={([v]) => setGradientRotation(v)} 
                                                        max={360} 
                                                        step={1} 
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                             <AccordionItem value="styles">
                                <AccordionTrigger><Shapes className="mr-2" />Advanced Styles</AccordionTrigger>
                                <AccordionContent className="pt-4 space-y-4">
                                    <div>
                                        <Label>Dot Style</Label>
                                        <Select value={dotType} onValueChange={(v) => setDotType(v as DotType)}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="dots">Dots</SelectItem>
                                                <SelectItem value="rounded">Rounded</SelectItem>
                                                <SelectItem value="classy">Classy</SelectItem>
                                                <SelectItem value="classy-rounded">Classy Rounded</SelectItem>
                                                <SelectItem value="square">Square</SelectItem>
                                                <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Corner Square Style</Label>
                                        <Select value={cornerSquareType} onValueChange={(v) => setCornerSquareType(v as CornerSquareType)}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="dot">Dot</SelectItem>
                                                <SelectItem value="square">Square</SelectItem>
                                                <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                     <div>
                                        <Label>Corner Dot Style</Label>
                                        <Select value={cornerDotType} onValueChange={(v) => setCornerDotType(v as CornerDotType)}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="dot">Dot</SelectItem>
                                                <SelectItem value="square">Square</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                             <AccordionItem value="logo">
                                <AccordionTrigger><ImageIcon className="mr-2" />Logo</AccordionTrigger>
                                <AccordionContent className="pt-4 space-y-4">
                                    <Input type="file" accept="image/*" ref={logoInputRef} onChange={handleLogoUpload} />
                                    {logo && (
                                        <div className="space-y-4">
                                            <Button variant="outline" size="sm" onClick={() => {
                                                setLogo(null);
                                                if (logoInputRef.current) logoInputRef.current.value = '';
                                            }}>Remove Logo</Button>
                                            <div className="flex items-center space-x-2">
                                                <Switch id="hide-dots" checked={hideBackgroundDots} onCheckedChange={setHideBackgroundDots} />
                                                <Label htmlFor="hide-dots">Hide dots behind logo</Label>
                                            </div>
                                            <div>
                                                <Label>Logo Size: {Math.round(imageSize * 100)}%</Label>
                                                <Slider value={[imageSize]} onValueChange={([v]) => setImageSize(v)} min={0.1} max={1} step={0.1} />
                                            </div>
                                            <div>
                                                <Label>Logo Margin: {imageMargin}px</Label>
                                                <Slider value={[imageMargin]} onValueChange={([v]) => setImageMargin(v)} min={0} max={20} step={1} />
                                            </div>
                                        </div>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                             <AccordionItem value="settings">
                                <AccordionTrigger><Shield className="mr-2" />Advanced Settings</AccordionTrigger>
                                <AccordionContent className="pt-4 space-y-4">
                                    <div>
                                        <Label>Error Correction</Label>
                                        <Select value={level} onValueChange={(v) => setLevel(v as ErrorCorrectionLevel)}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="L">Low (L)</SelectItem>
                                                <SelectItem value="M">Medium (M)</SelectItem>
                                                <SelectItem value="Q">Quartile (Q)</SelectItem>
                                                <SelectItem value="H">High (H)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Button onClick={handleGenerate} className="w-full mt-6" disabled={isGenerating}>
                            <QrCode className="mr-2" /> {isGenerating ? 'Generating...' : 'Generate QR Code'}
                        </Button>
                    </CardContent>
                </Card>
            </div>
            <div className="w-full md:w-1/2">
                 <Card className="p-4 md:p-6 shadow-2xl rounded-2xl bg-card flex flex-col justify-between h-full">
                    <CardContent className="p-0 flex-grow flex items-center justify-center">
                         <div className="p-4 bg-white rounded-lg w-full h-full flex items-center justify-center aspect-square transition-all duration-300">
                            {qrValue ? (
                                <QRCodeWrapper options={qrOptions} />
                            ) : <div className="text-muted-foreground text-center flex flex-col items-center justify-center h-full w-full">
                                <Logo className="w-16 h-16 text-muted mb-4" />
                                Your QR code will appear here
                                </div>}
                        </div>
                    </CardContent>
                    <div className="mt-6 space-y-4">
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Format</Label>
                                <Select value={exportFormat} onValueChange={(v) => setExportFormat(v as ExportFormat)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Format" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="png">PNG</SelectItem>
                                    <SelectItem value="svg">SVG</SelectItem>
                                </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Resolution (px)</Label>
                                <Input type="number" value={exportSize} onChange={e => setExportSize(Number(e.target.value))} />
                            </div>
                        </div>
                        <Button onClick={handleDownload} className="w-full" disabled={!qrValue}>
                            <Download className="mr-2" /> Download
                        </Button>
                    </div>
                </Card>
            </div>
        </main>
        <footer className="container mx-auto px-4 md:px-8 py-8">
            <Separator />
            <div className="mt-8 flex justify-center items-center text-sm text-muted-foreground">
                <p>Built with ❤️ by Sreya</p>
            </div>
      </footer>
      </div>
    )
}
