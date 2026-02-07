/**
 * Generates an optimized Cloudinary URL with specified transformations.
 * 
 * @param url The original Cloudinary image URL
 * @param options Transformation options
 * @returns The optimized URL or the original URL if not a Cloudinary URL
 */
export function getOptimizedImage(url: string, width = 500, height = 500) {
    if (!url || !url.includes('cloudinary.com')) {
        return url;
    }

    // Check if the URL already has transformations or if we can inject them
    // Standard Cloudinary URL format: https://res.cloudinary.com/<cloud_name>/image/upload/<transformations>/<version>/<public_id>.<format>

    // Split by '/upload/' to insert transformations right after it
    const parts = url.split('/upload/');

    if (parts.length !== 2) {
        return url;
    }

    const [start, end] = parts;
    // Transformations:
    // f_auto: Format auto (WebP/AVIF)
    // q_auto: Quality auto (good compression)
    // w_500,h_500: Resize to specific dimensions
    // c_fill: Crop to fill dimensions (prevents distortion)
    // g_face: Gravity face (focus on face when cropping)
    const transformations = `f_auto,q_auto,w_${width},h_${height},c_fill,g_face`;

    return `${start}/upload/${transformations}/${end}`;
}
