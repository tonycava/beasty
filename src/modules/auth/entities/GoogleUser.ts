export interface GoogleUserProfile {
	resourceName: string;
	etag: string;
	names: Name[];
	photos: Photo[];
	birthdays: Birthday[];
	emailAddresses: EmailAddress[];
}

interface Name {
	metadata: Metadata;
	displayName: string;
	familyName: string;
	givenName: string;
	displayNameLastFirst?: string;
	unstructuredName?: string;
}

interface Photo {
	metadata: Metadata;
	url: string;
}

interface Birthday {
	metadata: Metadata;
	date: DateInfo;
}

interface EmailAddress {
	metadata: Metadata;
	value: string;         
	type?: string;          
	formattedType?: string; 
}

interface Metadata {
	primary?: boolean;
	source: Source;
	sourcePrimary?: boolean;
}

interface Source {
	type: string;
	id: string;
}

interface DateInfo {
	year: number;
	month: number;
	day: number;
}
