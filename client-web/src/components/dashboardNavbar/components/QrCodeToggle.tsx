import Html5QrcodePlugin from "@/components/html5QrcodePlugin/Html5QrcodePlugin";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { FaQrcode } from "react-icons/fa";
import { Link } from "react-router-dom";

export const QrCodeToggle = () => {
    const [url, setUrl] = useState<string | null>(null);

    const onNewScanResult = (decodedText: string) => {
        setUrl(decodedText);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <FaQrcode />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <AlertDialogHeader>
                    <DialogTitle>QrCode Scanner</DialogTitle>
                </AlertDialogHeader>
                <div className="grid gap-4 py-4">
                    <Html5QrcodePlugin
                        fps={10}
                        qrbox={250}
                        disableFlip={false}
                        qrCodeSuccessCallback={onNewScanResult}
                    />
                </div>
                <DialogFooter className="flex gap-4 sm:justify-end">
                    {url !== null ? (
                        <Link to={url} className="w-full">
                            <Button type="button" className="w-full">
                                Go to site <ArrowRightIcon />
                            </Button>
                        </Link>
                    ) : (
                        ""
                    )}

                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
