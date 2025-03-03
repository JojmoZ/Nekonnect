export function timeToDateString(time: bigint): string {
  const timeInMilliseconds = Number(time / BigInt(1_000_000));

  const date = new Date(timeInMilliseconds);

  const day = String(date.getDate()).padStart(2, '0'); 
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function daysLeft(verifiedAt: bigint, postDuration: bigint): number {
  const daysLeft =
    postDuration -
    BigInt(
      Math.floor(
        (Date.now() - Number(verifiedAt / BigInt(1_000_000))) /
          (1000 * 60 * 60 * 24),
      ),
    );

  return Number(daysLeft);
}