export const getAspectRatio = (
    srcWidth: number,
    srcHeight: number,
    maxWidth: number,
    maxHeight: number,
) => {
    return Math.min(
        maxWidth / srcWidth,
        maxHeight / srcHeight,
    );
};
