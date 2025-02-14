import type { UserSubscriptionAcknoledgement } from './dto/UserSubscriptionAcknoledgement';

export interface ISQLiteSubscriptionUserCreateSubscription {
	createSubscription(data: UserSubscriptionAcknoledgement): Promise<void>;
}

export interface ISQLiteSubscriptionUserUpdateSubscription {
	updateSubscription(data: Pick<UserSubscriptionAcknoledgement, 'tier' | 'customerId'>): Promise<void>;
}

export interface ISQLiteSubscriptionUserDeleteSubscription {
	deleteSubscription(data: Pick<UserSubscriptionAcknoledgement,  'customerId'>): Promise<void>;
}

export type ISQLiteSubscriptionUserRepository = ISQLiteSubscriptionUserCreateSubscription &
	ISQLiteSubscriptionUserUpdateSubscription &
	ISQLiteSubscriptionUserDeleteSubscription;
