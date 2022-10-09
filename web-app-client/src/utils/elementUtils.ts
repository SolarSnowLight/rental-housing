
/*
    top(t) left(l) bottom(b) right(r)
    margin(M) border(B) scrollbar(S) padding(P) content(C)
    visible content(V) = visible part of padding+content
    full content(F) = padding+content
*/

const Bl = (el: HTMLElement) => window.getComputedStyle(el).borderLeftWidth


export const elementUtils = {
    Bl, borderLeft: Bl,

}