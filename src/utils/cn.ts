import { ClassValue, clsx } from 'clsx'; // library for conditional class names
import { twMerge } from 'tailwind-merge';

// use function cn so that we need anymore to import clsx and twMerge separately
export default function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}