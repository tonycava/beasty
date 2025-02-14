import type { UserSubscriptionAcknoledgement } from './dto/UserSubscriptionAcknoledgement';

export interface ISQLiteSubscriptionUserCreateSubscription {
	createSubscription(user: UserSubscriptionAcknoledgement): void;
}


export type ISQLiteSubscriptionUserRepository = ISQLiteSubscriptionUserCreateSubscription;
