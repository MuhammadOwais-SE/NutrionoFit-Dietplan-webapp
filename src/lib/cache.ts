// lib/cache.ts
import NodeCache from 'node-cache';

// Cache responses for 1 hour
export const responseCache = new NodeCache({ stdTTL: 3600 });