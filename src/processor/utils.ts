// see http://www.jingjingke.com/c/28134.html

export const getRelativeBackgroundPosition =
    (layout: number, container: number, dimension: number): number =>
        (dimension / (layout - container)) * 100;

export const getRelativeBackgroundSize =
    (layout: number, container: number, element: number = 1): number =>
        ((layout * (element / container)) / element) * 100;
