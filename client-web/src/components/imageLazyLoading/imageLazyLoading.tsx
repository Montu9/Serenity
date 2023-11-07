import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";

const ImageLazyLoading = ({ src }) => {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setImageLoaded(true);
        };
        img.src = src;
    }, [src]);
    return (
        <>
            {!imageLoaded && (
                <Blurhash hash="" width="100%" height="100%" resolutionX={32} resolutionY={32} punch={1} />
            )}
        </>
    );
};

export default ImageLazyLoading;
