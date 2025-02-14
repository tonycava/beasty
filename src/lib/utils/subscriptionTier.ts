export enum SubscriptionTier {
	Free = "Free",
	Essentiel = "Essentiel",
	Premium = "Premium",
	Business = "Business"
}


export class SubscriptionTierUtil {

	static toString(mode: SubscriptionTier): string {
		return SubscriptionTier[mode];
	}

	static fromString(mode: string): SubscriptionTier {
		if (mode === "") return SubscriptionTier.Free;
		return SubscriptionTier[mode as keyof typeof SubscriptionTier];
	}

}
