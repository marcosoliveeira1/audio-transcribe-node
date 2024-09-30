export class AudioUtils {
    static needsConversion(format: string): boolean {
        const NEEDS_CONVERSION = ['oga', 'ogg'];
        if (NEEDS_CONVERSION.includes(format)) {
            return true;
        }
        return false;
    }
}