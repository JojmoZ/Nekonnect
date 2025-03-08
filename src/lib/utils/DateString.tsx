export function timeToDateString(time: bigint): string {
  const timeInMilliseconds = Number(time / BigInt(1_000_000));

  const date = new Date(timeInMilliseconds);

  const day = String(date.getDate()).padStart(2, '0'); 
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function timeLeft(verifiedAt: bigint, postDuration: bigint): string {
  const now = Date.now();
  const verifiedAtMs = Number(verifiedAt / BigInt(1_000_000)); // Convert from nanoseconds to milliseconds
  
  // Total duration in milliseconds (postDuration is in days)
  const totalDurationMs = Number(postDuration) * 24 * 60 * 60 * 1000;
  //debug
  // const postDurationa = 1; // in minute
  // const totalDurationMs = Number(postDurationa) * 60 * 1000;
  
  const timeElapsedMs = now - verifiedAtMs;
  const timeLeftMs = totalDurationMs - timeElapsedMs;

  if (timeLeftMs <= 0) {
    return 'Expired';
  }
  const days = Math.floor(timeLeftMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeftMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeftMs % (1000 * 60)) / 1000);
  if (days > 0) {
    return `${days} days, ${hours} hours, ${minutes} minutes left`;
  } else {
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds left`;
  }
}

export function timeLeftMs(verifiedAt: bigint, postDuration: bigint): number {
  const now = Date.now();
  const verifiedAtMs = Number(verifiedAt / BigInt(1_000_000)); // Convert nanoseconds to milliseconds

  const totalDurationMs = Number(postDuration) * 24 * 60 * 60 * 1000; // Convert postDuration (days) to milliseconds

  const timeElapsedMs = now - verifiedAtMs;
  const timeLeftMs = totalDurationMs - timeElapsedMs;

  return Math.max(timeLeftMs, 0); // Return 0 if already expired
}