const returnTime = (time: string | number | Date) => new Date(time).getTime();
const isConflictPresent = (l1: number,l2: number,r1: number,r2: number) =>{
    debugger;
    return Math.max(l1, l2) < Math.min(r1, r2);
}
export {returnTime, isConflictPresent};