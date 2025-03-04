export async function serializeImage(image: File): Promise<Uint8Array> {
    const buffered = await image.arrayBuffer();
    return new Uint8Array(buffered);
}

export function deserializeImage(content: Uint8Array<ArrayBufferLike> | number[]): string {
    if (content.length > 0) {
        const blob = new Blob([new Uint8Array(content)]);
        return URL.createObjectURL(blob);
    } else {
        return "";
    }
}