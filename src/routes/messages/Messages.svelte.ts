import { writable } from 'svelte/store';
import type { Match } from '../../modules/matcher/entities/Match.ts';

export const selectedMatch = writable<Match | null>(null)
